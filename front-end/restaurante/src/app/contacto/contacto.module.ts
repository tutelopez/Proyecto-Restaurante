import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoPageComponent } from './contacto-page/contacto-page.component';



@NgModule({
  declarations: [
    ContactoPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ContactoPageComponent
  ]
})
export class ContactoModule { }
