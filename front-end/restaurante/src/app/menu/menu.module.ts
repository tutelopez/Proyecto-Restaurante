import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPageComponent } from './menu-page/menu-page.component';



@NgModule({
  declarations: [
    MenuPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MenuPageComponent
  ]
})
export class MenuModule { }
