import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/menu/productos.service';
import Productos from '../productos-interface';
import { CarritoService } from '../../carrito/carrito.service';
import { CarritoComunicacionService } from './carrito-comunicacion.service'
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  productos: Productos[] = [];
  chips: string[] = [];

   // Para el filtrado
   filteredProductos: Productos[] = [];
   selectedCategory: string | null = null;
 
  constructor(private productosService: ProductosService, 
    private carritoService: CarritoService,
    private carritoComunicacionService: CarritoComunicacionService,
    private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
      this.filteredProductos = productos; 
    });

    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.chips = categorias.map((categoria) => categoria.nombre);
    });
  }

  agregarAlCarrito(producto: Productos) {
    this.carritoService.agregarProducto(producto);
    this.carritoComunicacionService.actualizarContador();
  }

  filtrarPorCategoria(categoria: string) {
    this.selectedCategory = categoria;
    if (categoria === 'Todos') {
      this.filteredProductos = this.productos; // Mostrar todos los productos
    } else {
      this.filteredProductos = this.productos.filter((producto) => producto.categoria === categoria);
    }
  }

  // Limpiar el filtro y mostrar todos los productos
  mostrarTodos() {
    this.selectedCategory = null;
    this.filteredProductos = this.productos;
  }
  
}
