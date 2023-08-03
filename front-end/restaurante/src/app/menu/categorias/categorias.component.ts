import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/menu/categorias.service';
import Categorias from '../categorias-interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categorias[] = []; // Aquí almacenaremos la lista de categorías

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    // Cuando se inicializa el componente, llamamos a obtenerCategorias para obtener la lista de categorías
    this.categoriasService.obtenerCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Error al obtener las categorías:', error);
      }
    );
  }
}
