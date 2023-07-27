import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-badge-carrito-flotante',
  templateUrl: './badge-carrito-flotante.component.html',
  styleUrls: ['./badge-carrito-flotante.component.css']
})
export class BadgeCarritoFlotanteComponent {
  @Input() itemCount: number = 0;
}
