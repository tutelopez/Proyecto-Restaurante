import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/menu/productos.service';
import Productos from '../productos-interface';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  productos: Productos[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }
}
