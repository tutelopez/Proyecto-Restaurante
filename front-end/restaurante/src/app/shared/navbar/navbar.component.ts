import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from 'src/app/dashboard-admin/configuracion-dashboard/configuracion.service';
import Restaurante from 'src/app/dashboard-admin/configuracion-dashboard/interface/configuracion-interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor (private configuracionService: ConfiguracionService){}

  ngOnInit() {
    this.obtenerPrimerRestauranteDeLaColeccion();
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
