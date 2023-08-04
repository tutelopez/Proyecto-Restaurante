// carrito-dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoDialogComponent } from '../carrito/carrito-dialog/carrito-dialog.component';

@Injectable()
export class CarritoDialogService {
  constructor(private dialog: MatDialog) {}

  openCarritoDialog() {
    this.dialog.open(CarritoDialogComponent, {
      width: '500px',
      
    });
  }
}
