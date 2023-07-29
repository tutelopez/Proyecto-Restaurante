import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/menu/productos.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(private productosService: ProductosService) { }

  mostrarCategorias: boolean = false;
  mostrarProductos: boolean = false;

  mostrarContenidoCategorias() {
    this.mostrarCategorias = true;
    this.mostrarProductos = false;
  }

  mostrarContenidoProductos() {
    this.mostrarProductos = true;
    this.mostrarCategorias = false;
  }

  cantidadProductos: number = 0;
  
  ngOnInit(): void {
    // Llamar a la función para obtener el contador de productos al inicializar el componente
    this.obtenerCantidadProductos();
  }

  obtenerCantidadProductos() {
    this.productosService.obtenerProductos().subscribe((productos) => {
      this.cantidadProductos = productos.length;
    });
  }
}
