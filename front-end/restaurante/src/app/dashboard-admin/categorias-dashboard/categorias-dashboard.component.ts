import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoriasService} from 'src/app/menu/categorias.service';
import { Observable } from 'rxjs';
import Categorias from '../../menu/categorias-interface';


@Component({
  selector: 'app-categorias-dashboard',
  templateUrl: './categorias-dashboard.component.html',
  styleUrls: ['./categorias-dashboard.component.css']
})
export class CategoriasDashboardComponent implements OnInit {
  
  ngOnInit(): void {
    this.obtenerCategorias();
  }
  
  
  mostrarFormulario: boolean = false;
  formulario: FormGroup;
  categorias: Observable<Categorias[]>;
  urlImagenes: { [key: string]: string } = {}; // Objeto para almacenar las URLs de imagen por clave (identificador único)
  lastKey: string | null = null; // Variable para almacenar el último identificador único generado
  formularioEnviado: boolean = false;


  constructor(private categoriasService: CategoriasService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      
      foto: new FormControl(null, Validators.required)
    });
    this.categorias = new Observable<Categorias[]>(); // Inicializar productos como un Observable vacío
  }


  obtenerCategorias() {
    this.categorias = this.categoriasService.obtenerCategorias();
    this.categorias.subscribe((categorias) => {
      // Mapear las URLs de imagen al objeto urlImagenes usando el ID del producto como clave
      categorias.forEach((categoria) => {
        this.urlImagenes[categoria.id!] = categoria.foto || ''; // Asignar '' si foto es null
        this.lastKey = categoria.id || null; // Actualizar el último identificador único generado
      });
      console.log('urlImagenes:', this.urlImagenes);
    });
  }

  async eliminarCategoria(categoria: Categorias) {
    const response = await this.categoriasService.eliminarCategoria(categoria);
    console.log(response);
    this.obtenerCategorias();
  }


  async onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
  
      const nuevaCategoria: Categorias = {
        nombre: this.formulario.value.nombre,
        foto: this.lastKey !== null ? this.urlImagenes[this.lastKey] : null // Asignar null si no hay foto cargada
      };
  
      console.log('Nueva categoria agregar:', nuevaCategoria); // Agregar esta línea para imprimir los datos del nuevo producto
  
      const response = await this.categoriasService.agregarCategoria(nuevaCategoria);
      console.log('Respuesta del servicio:', response); // Agregar esta línea para imprimir la respuesta del servicio
  
      // Resetear el formulario y marcarlo como no enviado
      this.formulario.reset();
      this.formularioEnviado = false;
  
      // Cerrar el formulario
      this.mostrarFormulario = false;
  
      // Volver a cargar la lista de productos
      this.obtenerCategorias();
    }
  }


  imagenes: any[] = [];
  async cargarImagen(event: any) {
    let archivos = event.target.files;
    let reader = new FileReader();
    let nombre = "mateo";
  
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = async () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
  
      // Generar el identificador único manualmente usando el timestamp actual y el nombre del archivo de imagen
      const timestamp = Date.now();
      const key = `image_${nombre}_${timestamp}`;
  
      const urlImagen = await this.categoriasService.subirImagen(nombre + "_" + timestamp, reader.result);
  
      if (urlImagen !== null) {
        console.log(urlImagen);
        this.urlImagenes[key] = urlImagen; // Almacenar la URL en el objeto urlImagenes usando el identificador único como clave
        this.lastKey = key; // Actualizar el último identificador único generado
      } else {
        console.log('Error al obtener la URL de la imagen desde Firebase Storage.');
      }
    };
  }





}
