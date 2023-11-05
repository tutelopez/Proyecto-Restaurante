import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductosService } from 'src/app/menu/productos.service';
import {CategoriasService} from 'src/app/menu/categorias.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(private productosService: ProductosService,
      private categoriasService: CategoriasService,
      
      ) { }
  
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
    cantidadCategorias: number = 0;
    
    ngOnInit(): void {
      // Llamar a la función para obtener el contador de productos al inicializar el componente
      this.obtenerCantidadProductos();
      this.obtenerCantidadCategorias();
      
    }
    
  
    obtenerCantidadProductos() {
      this.productosService.obtenerProductos().subscribe((productos) => {
        this.cantidadProductos = productos.length;
      });
    }
  
    obtenerCantidadCategorias() {
      this.categoriasService.obtenerCategorias().subscribe((categorias) => {
        this.cantidadCategorias = categorias.length;
      });
    }
  
}
