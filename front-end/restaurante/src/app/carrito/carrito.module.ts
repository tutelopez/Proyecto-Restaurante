import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoDialogComponent } from './carrito-dialog/carrito-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CarritoDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule
  ]
})
export class CarritoModule { }
