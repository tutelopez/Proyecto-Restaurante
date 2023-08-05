import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoDialogComponent } from './carrito-dialog/carrito-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    CarritoDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatSlideToggleModule
  ]
})
export class CarritoModule { }
