import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
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
}
