import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from '../menu/menu.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    SharedModule,
  ],
  exports: [
    InicioComponent
  ]
  
})
export class HomeModule { }
