import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { BadgeCarritoFlotanteComponent } from './badge-carrito-flotante/badge-carrito-flotante.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BadgeCarritoFlotanteComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatBadgeModule
  ],
  exports: [NavbarComponent, FooterComponent, BadgeCarritoFlotanteComponent],
})
export class SharedModule { }
