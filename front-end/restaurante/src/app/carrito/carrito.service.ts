import { Injectable } from '@angular/core';
import Productos from '../menu/productos-interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Productos[] = [];
  constructor() { }

  agregarProducto(producto: Productos) {
    this.carrito.push(producto);
  }

  eliminarProducto(index: number) {
    if (index >= 0 && index < this.carrito.length) {
      this.carrito.splice(index, 1);
    }
  }

  obtenerCarrito(): Productos[] {
    return this.carrito;
  }

  obtenerCantidadTotal(): number {
    return this.carrito.length;
  }

  limpiarCarrito() {
    this.carrito = [];
  }

  calcularPrecioTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }
  
}
