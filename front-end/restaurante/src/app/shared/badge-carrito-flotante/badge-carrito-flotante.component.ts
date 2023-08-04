import { Component,Input  } from '@angular/core';
import { CarritoDialogService } from '../../carrito/carrito-dialog.service'
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CarritoDialogComponent } from 'src/app/carrito/carrito-dialog/carrito-dialog.component';
import { CarritoService } from '../../carrito/carrito.service';
import { CarritoComunicacionService } from '../../menu/menu-page/carrito-comunicacion.service'

@Component({
  selector: 'app-badge-carrito-flotante',
  templateUrl: './badge-carrito-flotante.component.html',
  styleUrls: ['./badge-carrito-flotante.component.css'],
  
})
export class BadgeCarritoFlotanteComponent {
  @Input() itemCount: number = 0;

  constructor(public dialog: MatDialog, private carritoService: CarritoService, private carritoComunicacionService: CarritoComunicacionService) {
    this.actualizarContador();

    this.carritoComunicacionService.actualizarContador$.subscribe(() => {
      // Actualizar el contador cuando se envía un pedido
      this.actualizarContador();
    });
  }  


  openDialog() {
    const dialogRef = this.dialog.open(CarritoDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // Actualizar el contador cuando se cierre el diálogo (por ejemplo, si se eliminan productos)
      this.actualizarContador();
    });
  }
  
  private actualizarContador() {
    // Obtener la cantidad total de productos en el carrito desde el servicio CarritoService
    this.itemCount = this.carritoService.obtenerCantidadTotal();
  }

}
