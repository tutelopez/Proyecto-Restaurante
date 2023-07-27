import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from '../menu/menu.module';
@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
  ],
  exports: [
    InicioComponent
  ]
  
})
export class HomeModule { }
