import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoPageComponent } from './contacto-page/contacto-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ContactoPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports:[
    ContactoPageComponent
  ]
})
export class ContactoModule { }
