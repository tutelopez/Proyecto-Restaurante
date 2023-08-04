import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import Productos from '../../menu/productos-interface';
import { CarritoComunicacionService } from '../../menu/menu-page/carrito-comunicacion.service';

@Component({
  selector: 'app-carrito-dialog',
  templateUrl: './carrito-dialog.component.html',
  styleUrls: ['./carrito-dialog.component.css']
})
export class CarritoDialogComponent implements OnInit {
  productosCarrito: Productos[] = [];
  precioTotal: number = 0;

  constructor(private carritoService: CarritoService, private carritoComunicacionService: CarritoComunicacionService) {}

  ngOnInit() {
    this.productosCarrito = this.carritoService.obtenerCarrito();
    this.precioTotal = this.carritoService.calcularPrecioTotal();
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
    this.precioTotal = this.carritoService.calcularPrecioTotal();
    this.carritoComunicacionService.actualizarContador();
  }
  
}
