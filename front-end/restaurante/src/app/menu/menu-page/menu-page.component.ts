import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/menu/productos.service';
import Productos from '../productos-interface';
import { CarritoService } from '../../carrito/carrito.service';
import { CarritoComunicacionService } from './carrito-comunicacion.service'

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  productos: Productos[] = [];

  constructor(private productosService: ProductosService, 
    private carritoService: CarritoService,
    private carritoComunicacionService: CarritoComunicacionService) { }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  agregarAlCarrito(producto: Productos) {
    this.carritoService.agregarProducto(producto);
    this.carritoComunicacionService.actualizarContador();
  }
  
}
