import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/menu/categorias.service';
import { Observable } from 'rxjs';
import Categorias from '../../menu/categorias-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categorias-dashboard',
  templateUrl: './categorias-dashboard.component.html',
  styleUrls: ['./categorias-dashboard.component.css'],
})
export class CategoriasDashboardComponent implements OnInit {
  ngOnInit(): void {
    this.obtenerCategorias();
  }

  categoriasTabla = new MatTableDataSource<Categorias>();
  displayedColumns: string[] = ['nombre', 'foto', 'accion'];
  formularioEdicion: FormGroup;
  mostrarFormulario: boolean = false;
  formulario: FormGroup;
  categorias: Observable<Categorias[]>;
  urlImagenes: { [key: string]: string } = {};
  lastKey: string | null = null;
  formularioEnviado: boolean = false;

  constructor(private categoriasService: CategoriasService, private snackBar: MatSnackBar) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      foto: new FormControl(null, Validators.required),
    });

    this.formularioEdicion = new FormGroup({
      nombre: new FormControl('', Validators.required),
      foto: new FormControl({ value: null, disabled: false },)
    });




    this.categorias = new Observable<Categorias[]>();
  }
  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000, // Duración en milisegundos (3 segundos en este ejemplo)
    });
  }
  obtenerCategorias() {
    this.categorias = this.categoriasService.obtenerCategorias();
    this.categorias.subscribe((categorias) => {
      // Asignar un valor de 'id' a las categorías que no lo tienen
      categorias.forEach((categoria, index) => {
        if (!categoria.id) {
          categoria.id = `${index + 1}`; // Puedes generar un 'id' temporal aquí
        }
        this.urlImagenes[categoria.id] = categoria.foto || '';
        this.lastKey = categoria.id;
      });
      // Asignar las categorías al origen de datos de la tabla
      this.categoriasTabla.data = categorias;
      console.log('urlImagenes:', this.urlImagenes);
    });
  }

  async eliminarCategoria(categoria: Categorias) {
    const response = await this.categoriasService.eliminarCategoria(categoria);
    console.log(response);
    this.mostrarSnackbar('Categoria eliminada correctamente');
    this.obtenerCategorias();
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const nuevaCategoria: Categorias = {
        nombre: this.formulario.value.nombre,
        foto: this.lastKey !== null ? this.urlImagenes[this.lastKey] : null,
      };
      const response = await this.categoriasService.agregarCategoria(
        nuevaCategoria
      );
      console.log('Respuesta del servicio:', response);
      this.mostrarSnackbar('Categoria creada correctamente');
      this.imagenCargada = false;
      this.formulario.reset();
      this.formularioEnviado = false;
      this.mostrarFormulario = false;
      this.obtenerCategorias();
    }
  }

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
        this.botonGuardarHabilitado = false;
  
        const urlImagen = await this.categoriasService.subirImagen(nombre + "_" + timestamp, reader.result);
  
        if (urlImagen !== null) {
          this.imagenCargada = false; // Reiniciar la variable al cargar una nueva imagen
          console.log(urlImagen);
          this.urlImagenes[key] = urlImagen;
          this.lastKey = key;
          this.imagenCargada = true;
        } else {
          console.log('Error al obtener la URL de la imagen desde Firebase Storage.');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        // Puedes mostrar un mensaje de error o realizar otras acciones según tus necesidades aquí.
      } finally {
        this.botonGuardarHabilitado = true; // Asegúrate de habilitar el botón después de cargar la imagen
        this.formularioEdicion.controls['foto'].enable(); 
      }
    };
  }
  

  
  async actualizarCategoriaEnFirestore(categoria: Categorias) {
    try {
      await this.categoriasService.actualizarCategoria(categoria);
      this.mostrarSnackbar('Categoria actualizado correctamente');
      this.obtenerCategorias();
    } catch (error) {
      console.error('Error al actualizar la Categoria:', error);
    }
  }


  mostrarFormularioEdicion: boolean = false;
  categoriaSeleccionadaId: string | null = null; 

  editarCategoria(categoria: Categorias) {
    console.log('ID del producto seleccionado:', categoria.id);
    this.categoriaSeleccionadaId =categoria.id || null;
  
    // Obtener la URL de la imagen desde Firebase Storage
    const urlImagen = this.urlImagenes[categoria.id!] || '';
    console.log('URL IMAGEN DE LA CATEGORIA:', categoria.foto);
  
    // Verificar si se cargó una nueva imagen al editar el producto
    this.imagenCargada = false; // Reiniciamos la variable
    // Llenar el formulario de edición con los datos del producto seleccionado
    this.formularioEdicion.patchValue({
      nombre: categoria.nombre,
     
      foto: categoria.foto // Utilizar la URL de la imagen en lugar del identificador
    });
  
    // Mostrar el formulario de edición
    this.mostrarFormularioEdicion = true;
    this.mostrarFormulario=false;
  }
 
  guardarEdicion() {
    if (this.formularioEdicion.valid && this.categoriaSeleccionadaId) {
      const fotoEditada = this.imagenCargada
        ? this.lastKey !== null ? this.urlImagenes[this.lastKey] : null
        : this.formularioEdicion.value.foto || null;
  
      console.log('Foto editada:', fotoEditada);
  
      const categoriaEditada: Categorias = {
        id: this.categoriaSeleccionadaId,
        nombre: this.formularioEdicion.value.nombre,
       
        foto: fotoEditada,
        
      };
  
      this.actualizarCategoriaEnFirestore(categoriaEditada);
  
      // Reiniciar formulario y marcarlo como no enviado
      this.formularioEdicion.reset();
      this.formularioEnviado = true;
  
      // Cerrar el formulario de edición
      this.mostrarFormularioEdicion = false;
      this.formularioEnviado = false;
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
