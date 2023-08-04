import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { MenuDeRestauranteComponent } from './menu-de-restaurante/menu-de-restaurante.component';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    MenuPageComponent,
    CategoriasComponent,
    MenuDeRestauranteComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule
  ],
  exports:[
    MenuPageComponent,
    CategoriasComponent,
    MenuDeRestauranteComponent
  ]
})
export class MenuModule { }
