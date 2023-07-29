// COMPONENT

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/menu/productos.service';
import { Observable } from 'rxjs';
import Productos from '../../menu/productos-interface';

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
  constructor(private productosService: ProductosService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),
      foto: new FormControl(null, Validators.required)
    });
    this.productos = new Observable<Productos[]>(); // Inicializar productos como un Observable vacío
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productos = this.productosService.obtenerProductos();
    this.productos.subscribe((productos) => {
      // Mapear las URLs de imagen al objeto urlImagenes usando el ID del producto como clave
      productos.forEach((producto) => {
        this.urlImagenes[producto.id!] = producto.foto || ''; // Asignar '' si foto es null
        this.lastKey = producto.id || null; // Actualizar el último identificador único generado
      });
      console.log('urlImagenes:', this.urlImagenes);
    });
  }

  async eliminarProducto(producto: Productos) {
    const response = await this.productosService.eliminarProducto(producto);
    console.log(response);
    this.obtenerProductos();
  }

  async onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
  
      const nuevoProducto: Productos = {
        nombre: this.formulario.value.nombre,
        precio: this.formulario.value.precio,
        foto: this.lastKey !== null ? this.urlImagenes[this.lastKey] : null // Asignar null si no hay foto cargada
      };
  
      console.log('Nuevo producto a agregar:', nuevoProducto); // Agregar esta línea para imprimir los datos del nuevo producto
  
      const response = await this.productosService.agregarProducto(nuevoProducto);
      console.log('Respuesta del servicio:', response); // Agregar esta línea para imprimir la respuesta del servicio
  
      // Resetear el formulario y marcarlo como no enviado
      this.formulario.reset();
      this.formularioEnviado = false;
  
      // Cerrar el formulario
      this.mostrarFormulario = false;
  
      // Volver a cargar la lista de productos
      this.obtenerProductos();
    }
  }
  

  mostrarFormulario: boolean = false;
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
  
      const urlImagen = await this.productosService.subirImagen(nombre + "_" + timestamp, reader.result);
  
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
