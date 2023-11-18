import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from './dashboard-admin/configuracion-dashboard/configuracion.service';
import Restaurante from './dashboard-admin/configuracion-dashboard/interface/configuracion-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private configuracionService: ConfiguracionService) {}
  cargando: boolean = true;
  fadeOutClass: string = '';
  ngOnInit(): void {
    this.configuracionService.nombreRestaurante$.subscribe((nombreRestaurante) => {
      document.title = nombreRestaurante;
    });

    this.obtenerPrimerRestauranteDeLaColeccion();
  }

  primerRestaurante: Restaurante | null = null;

  obtenerPrimerRestauranteDeLaColeccion() {
    this.cargando = true;

    this.configuracionService.obtenerColeccionRestaurantes().subscribe((restaurantes) => {
      if (restaurantes.length > 0) {
        this.fadeOutClass = 'fade-out';
        this.primerRestaurante = restaurantes[0];
        this.configuracionService.actualizarNombreRestaurante(this.primerRestaurante.nombre);
        this.establecerFavicon(this.primerRestaurante.foto);       
        setTimeout(() => {
         this.cargando = false;
        }, 3000);
      }
    });
  }

  establecerFavicon(url: string | null) {
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null || document.createElement('link');
    
    if (favicon) {
      favicon.type = 'image/x-icon';
      favicon.rel = 'shortcut icon';
      favicon.href = url || 'URL_POR_DEFECTO_SI_ES_NULO'; // Establece una URL de imagen por defecto si url es nulo
      document.head.appendChild(favicon);
    }
  }
  
}
