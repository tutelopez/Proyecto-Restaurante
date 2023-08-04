import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoDialogComponent } from './carrito-dialog/carrito-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    CarritoDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class CarritoModule { }
