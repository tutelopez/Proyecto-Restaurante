import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-detalle-dialog',
  templateUrl: './producto-detalle-dialog.component.html',
  styleUrls: ['./producto-detalle-dialog.component.css']
})
export class ProductoDetalleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
}
