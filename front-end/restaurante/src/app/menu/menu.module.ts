import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MenuDeRestauranteComponent } from './menu-de-restaurante/menu-de-restaurante.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ProductoDetalleDialogComponent } from './menu-page/producto-detalle-dialog/producto-detalle-dialog.component';
@NgModule({
  declarations: [
    MenuPageComponent,
    CategoriasComponent,
    MenuDeRestauranteComponent,
    ProductoDetalleDialogComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatSnackBarModule,
    SharedModule,
    RouterModule,
    MatIconModule,
  ],
  exports:[
    MenuPageComponent,
    CategoriasComponent,
    MenuDeRestauranteComponent
  ]
})
export class MenuModule { }
