import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import Productos from '../../menu/productos-interface';
import { CarritoComunicacionService } from '../../menu/menu-page/carrito-comunicacion.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfiguracionService } from 'src/app/dashboard-admin/configuracion-dashboard/configuracion.service';
import Restaurante from 'src/app/dashboard-admin/configuracion-dashboard/interface/configuracion-interface';

@Component({
  selector: 'app-carrito-dialog',
  templateUrl: './carrito-dialog.component.html',
  styleUrls: ['./carrito-dialog.component.css']
})
export class CarritoDialogComponent implements OnInit {
  productosCarrito: Productos[] = [];
  precioTotal: number = 0;
  //CAMPOS PARA EL FORMULARIO
  nombreRecibe: string = '';
  numeroTelefono: string = '';
  direccion: string = '';
  notaEspecial: string = '';
 

  constructor(private carritoService: CarritoService,
    private configuracionService: ConfiguracionService, 
    private carritoComunicacionService: CarritoComunicacionService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.productosCarrito = this.carritoService.obtenerCarrito();
    this.precioTotal = this.carritoService.calcularPrecioTotal();
    this.obtenerPrimerRestauranteDeLaColeccion();
  }

  
  eliminarProducto(index: number) {
    this.carritoService.eliminarProducto(index);
    this.precioTotal = this.carritoService.calcularPrecioTotal();
    this.carritoComunicacionService.actualizarContador();
    this.mostrarSnackbar();
  }
  mostrarSnackbar() {
    this.snackBar.open('Has quitado un item de tu pedido', '', {
      duration: 3000, // Duración en milisegundos que el Snackbar estará visible
      horizontalPosition: 'center', // Posición horizontal (start, center, end)
      verticalPosition: 'bottom', // Posición vertical (top, bottom)
      panelClass: ['no-close-button']
    });
  }

  generarMensajePedido(): string {
    let mensaje = '¡Hola! Quiero realizar el siguiente pedido:\n\n';
  
    for (const producto of this.productosCarrito) {
      mensaje += `- ${producto.nombre}  - $${producto.precio}\n`;
    }
  
    mensaje += `\nTotal del pedido: $${this.precioTotal}`;
  
    // Agregar datos del formulario al mensaje
    mensaje += `\n\nDatos del cliente:\n`;
    mensaje += `- Nombre de quien recibe: ${this.nombreRecibe}\n`;
    mensaje += `- Número de teléfono: ${this.numeroTelefono}\n`;
    mensaje += `- Dirección de entrega: ${this.direccion}\n`;
    mensaje += `- Nota especial: ${this.notaEspecial}\n`;
  
    return mensaje;
  }
  

  getWhatsappLink(): string {
    const mensaje = this.generarMensajePedido();
    let telefono = 'XXXXXXXXXXXX'; // Número de teléfono por defecto
  
    if (this.primerRestaurante && this.primerRestaurante.numeroTel) {
      telefono = this.primerRestaurante.numeroTel.toString();
    }
  
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
    return url;
  }
  

  
  enviarPedido(): void {
    // Verificar si los campos requeridos están completos
    if (!this.nombreRecibe || !this.numeroTelefono || !this.direccion) {
      alert('Por favor, completa todos los campos requeridos antes de enviar el pedido.');
      return;
    }
  
    // Si los campos requeridos están completos, continuar con el envío del pedido
    const url = this.getWhatsappLink();
  
    // Abrir la ventana de WhatsApp mediante JavaScript
    const whatsappWindow = window.open(url, '_blank');
  
    // Verificar si la ventana de WhatsApp se ha abierto
    const checkWindowOpen = setInterval(() => {
      if (whatsappWindow && whatsappWindow.closed) {
        // Si la ventana de WhatsApp se ha abierto, ejecutar la función limpiarCarrito
        this.carritoService.limpiarCarrito();
        this.carritoComunicacionService.actualizarContador();
        this.productosCarrito = this.carritoService.obtenerCarrito(); 
        clearInterval(checkWindowOpen);
      }
    }, 1000); // Revisar cada segundo si la ventana se ha abierto
  }
  

  primerRestaurante: Restaurante | null = null;
  obtenerPrimerRestauranteDeLaColeccion() {
    this.configuracionService.obtenerColeccionRestaurantes().subscribe((restaurantes) => {
      if (restaurantes.length > 0) {
        this.primerRestaurante = restaurantes[0];
       
        console.log('FUNCION RESTAURANTE COLLECT Primer restaurante de la colección:', this.primerRestaurante);
      }
    });
}
}
