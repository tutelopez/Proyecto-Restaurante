import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import Productos from '../../menu/productos-interface';
import { CarritoComunicacionService } from '../../menu/menu-page/carrito-comunicacion.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-carrito-dialog',
  templateUrl: './carrito-dialog.component.html',
  styleUrls: ['./carrito-dialog.component.css']
})
export class CarritoDialogComponent implements OnInit {
  productosCarrito: Productos[] = [];
  precioTotal: number = 0;

  constructor(private carritoService: CarritoService, 
    private carritoComunicacionService: CarritoComunicacionService,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.productosCarrito = this.carritoService.obtenerCarrito();
    this.precioTotal = this.carritoService.calcularPrecioTotal();
  }

  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
    this.precioTotal = this.carritoService.calcularPrecioTotal();
    this.carritoComunicacionService.actualizarContador();
  }
  

  generarMensajePedido(): string {
    let mensaje = '¡Hola! Quiero realizar el siguiente pedido:\n\n';

    for (const producto of this.productosCarrito) {
      mensaje += `- ${producto.nombre}  - $${producto.precio}\n`;
    }

    mensaje += `\nTotal del pedido: $${this.precioTotal}`;

    return mensaje;
  }

  getWhatsappLink(): SafeUrl {
    const mensaje = this.generarMensajePedido();
    const telefono = 'XXXXXXXXXXXX'; // Reemplaza con el número de teléfono al que deseas enviar el pedido

    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
    this.carritoService.limpiarCarrito()
    return this.sanitizer.bypassSecurityTrustUrl(url);
    
  }

}
