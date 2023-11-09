// COMPONENT

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/menu/productos.service';
import { Observable, of } from 'rxjs';
import Productos from '../../menu/productos-interface';
import { CategoriasService } from 'src/app/menu/categorias.service';
import Categorias from '../../menu/categorias-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-productos-dashboard',
  templateUrl: './productos-dashboard.component.html',
  styleUrls: ['./productos-dashboard.component.css']
})
export class ProductosDashboardComponent implements OnInit {
  
  formulario: FormGroup;
  formularioEdicion: FormGroup;
  productos: Observable<Productos[]>;
  
  urlImagenes: { [key: string]: string } = {}; // Objeto para almacenar las URLs de imagen por clave (identificador único)
  lastKey: string | null = null; // Variable para almacenar el último identificador único generado
  formularioEnviado: boolean = false;
  categorias: Observable<Categorias[]>;

  constructor(private productosService: ProductosService, private categoriasService: CategoriasService, private snackBar: MatSnackBar) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),
      categoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      foto: new FormControl(null, Validators.required)
    });
    this.productos = new Observable<Productos[]>();
    this.categorias = new Observable<Categorias[]>(); // Inicializar CATEGORIAS como un Observable vacío
  
    

    this.formularioEdicion = new FormGroup({
      nombre: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),
      categoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      foto: new FormControl({ value: null, disabled: false },)
    });
  
  
  
  
  }
  
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  productosTabla = new MatTableDataSource<Productos>();
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'categoria', 'foto', 'accion'];
  

  obtenerProductos() {
    this.productos = this.productosService.obtenerProductos();
    this.productos.subscribe((productos) => {
      this.productosTabla.data = productos;
      // Mapear las URLs de imagen al objeto urlImagenes usando el ID del producto como clave
      productos.forEach((producto) => {
        this.urlImagenes[producto.id!] = producto.foto || ''; // Asignar '' si foto es null
        this.lastKey = producto.id || null; // Actualizar el último identificador único generado
      });
      console.log('urlImagenes:', this.urlImagenes);
    });
  }

  obtenerCategorias() {
    this.categorias = this.categoriasService.obtenerCategorias();
    this.categorias.subscribe((categorias) => {
      
      categorias.forEach((categoria) => {
        this.urlImagenes[categoria.id!] = categoria.foto || ''; // Asignar '' si foto es null
        this.lastKey = categoria.id || null; // Actualizar el último identificador único generado
      });
      console.log('urlImagenes:', this.urlImagenes);
    });
  }

  async eliminarProducto(producto: Productos) {
    const response = await this.productosService.eliminarProducto(producto);
    console.log(response);
    this.mostrarSnackbar('Producto eliminado correctamente');
    this.obtenerProductos();
  }

  async onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
  
      const nuevoProducto: Productos = {
        nombre: this.formulario.value.nombre,
        precio: this.formulario.value.precio,
        descripcion: this.formulario.value.descripcion,
        foto: this.lastKey !== null ? this.urlImagenes[this.lastKey] : null,
        categoria: this.formulario.value.categoria
      };
  
      console.log('Nuevo producto a agregar:', nuevoProducto);
  
      try {
        const response = await this.productosService.agregarProducto(nuevoProducto);
        console.log('Respuesta del servicio:', response);
        this.mostrarSnackbar('Producto creado correctamente');
        this.imagenCargada = false;
        // Resetear el formulario y marcarlo como no enviado
        this.formulario.reset();
        this.formularioEnviado = false;
  
        // Cerrar el formulario
        this.mostrarFormulario = false;
  
        // Volver a cargar la lista de productos
        this.obtenerProductos();
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    }
  }
  
  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
    });}

  mostrarFormulario: boolean = false;
  imagenes: any[] = [];


  imagenCargada: boolean = true;
  botonGuardarHabilitado: boolean = true;

  async cargarImagen(event: any) {
    let archivos = event.target.files;
    let reader = new FileReader();
    let nombre = "producto-restaurante";
  
    reader.readAsDataURL(archivos[0]);
  
    reader.onloadend = async () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
  
      // Generar el identificador único manualmente usando el timestamp actual y el nombre del archivo de imagen
      const timestamp = Date.now();
      const key = `image_${nombre}_${timestamp}`;
  
      // Utilizar un try-catch para manejar errores al subir la imagen
      try {
        // Deshabilitar el botón de guardar edición mientras se carga la imagen
        this.botonGuardarHabilitado = false;
  
        const urlImagen = await this.productosService.subirImagen(nombre + "_" + timestamp, reader.result);
  
        if (urlImagen !== null) {
          this.imagenCargada = false; // Reiniciar la variable al cargar una nueva imagen
          console.log(urlImagen);
          this.urlImagenes[key] = urlImagen;
          this.lastKey = key;
          this.imagenCargada = true;
  
          // Actualizar el estado de guardarEdicionHabilitado
          this.botonGuardarHabilitado = true;
        } else {
          console.log('Error al obtener la URL de la imagen desde Firebase Storage.');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        // Puedes mostrar un mensaje de error o realizar otras acciones según tus necesidades aquí.
      } finally {
        this.formularioEdicion.controls['foto'].enable(); // Habilitar el campo de foto al terminar la carga
      }
    };
  }
  

  async actualizarProductoEnFirestore(producto: Productos) {
    try {
      await this.productosService.actualizarProducto(producto);
      this.mostrarSnackbar('Producto actualizado correctamente');
      this.obtenerProductos();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }

  productoSeleccionadoId: string | null = null; 
  mostrarFormularioEdicion: boolean = false;



  editarProducto(producto: Productos) {
    console.log('ID del producto seleccionado:', producto.id);
    this.productoSeleccionadoId = producto.id || null;
  
    // Obtener la URL de la imagen desde Firebase Storage
    const urlImagen = this.urlImagenes[producto.id!] || '';
    console.log('URL IMAGEN DEL PRODUCTO:', producto.foto);
  
    // Verificar si se cargó una nueva imagen al editar el producto
    this.imagenCargada = false; // Reiniciamos la variable
    // Llenar el formulario de edición con los datos del producto seleccionado
    this.formularioEdicion.patchValue({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      foto: producto.foto // Utilizar la URL de la imagen en lugar del identificador
    });
  
    // Mostrar el formulario de edición
    this.mostrarFormularioEdicion = true;
    this.mostrarFormulario= false;
  }
  
  guardarEdicion() {
    if (this.formularioEdicion.valid && this.productoSeleccionadoId) {
      const fotoEditada = this.imagenCargada
        ? this.lastKey !== null ? this.urlImagenes[this.lastKey] : null
        : this.formularioEdicion.value.foto || null;
  
      console.log('Foto editada:', fotoEditada);
  
      const productoEditado: Productos = {
        id: this.productoSeleccionadoId,
        nombre: this.formularioEdicion.value.nombre,
        precio: this.formularioEdicion.value.precio,
        descripcion: this.formularioEdicion.value.descripcion,
        foto: fotoEditada,
        categoria: this.formularioEdicion.value.categoria
      };
  
      this.actualizarProductoEnFirestore(productoEditado);
  
      // Reiniciar formulario y marcarlo como no enviado
      this.formularioEdicion.reset();
      this.formularioEnviado = true;
  
      // Cerrar el formulario de edición
      this.mostrarFormularioEdicion = false;
     
    }
  }
  
  
  
  
  
  
  cancelarEdicion() {
    // Resetear el formulario de edición y marcarlo como no enviado
    this.formularioEdicion.reset();
    this.formularioEnviado = false; // Agrega esta línea para restablecer la variable
    // Cerrar el formulario de edición
    this.mostrarFormularioEdicion = false;
  }
  





  
}
