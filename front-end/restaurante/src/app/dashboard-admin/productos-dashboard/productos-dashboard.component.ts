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


  imagenCargada: boolean = false;

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
        const urlImagen = await this.productosService.subirImagen(nombre + "_" + timestamp, reader.result);
  
        if (urlImagen !== null) {
          console.log(urlImagen);
          this.urlImagenes[key] = urlImagen; // Almacenar la URL en el objeto urlImagenes usando el identificador único como clave
          this.lastKey = key; // Actualizar el último identificador único generado
          this.imagenCargada = true;
        } else {
          console.log('Error al obtener la URL de la imagen desde Firebase Storage.');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        // Puedes mostrar un mensaje de error o realizar otras acciones según tus necesidades aquí.
      }
    };
  }
  
}
