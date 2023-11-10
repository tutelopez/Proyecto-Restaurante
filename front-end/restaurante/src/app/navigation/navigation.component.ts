import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductosService } from 'src/app/menu/productos.service';
import {CategoriasService} from 'src/app/menu/categorias.service';
import { UserServiceService } from '../auth/user.service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from './logout-confirmation-dialog/logout-confirmation-dialog.component';
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
      private userService: UserServiceService,
      private router: Router,
      private dialog: MatDialog
      
      ) { }
  
    mostrarCategorias: boolean = false;
    mostrarProductos: boolean = false;
    mostrarConfiguracion: boolean = false;

    mostrarContenidoCategorias() {
      this.mostrarCategorias = true;
      this.mostrarProductos = false;
      this.mostrarConfiguracion = false;
    }
  
    mostrarContenidoProductos() {
      this.mostrarProductos = true;
      this.mostrarCategorias = false;
      this.mostrarConfiguracion = false;
    }

    mostrarContenidoConfiguracion() {
      this.mostrarCategorias = false;
      this.mostrarProductos = false;
      this.mostrarConfiguracion = true;
    }


    mostrarNada() {
      this.mostrarProductos =false;
      this.mostrarCategorias = false;
      this.mostrarConfiguracion = false;
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
  
    cerrarSesion(){
      this.userService.logOut()
        .then(() =>{
          this.router.navigate(['/login']);
        })
        .catch(error => console.log(error));
    };

    openLogoutConfirmationDialog(): void {
      const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent);
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // El usuario confirmó el cierre de sesión
          this.cerrarSesion();
        }
      });
    }
    
}
