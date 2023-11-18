import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/menu/productos.service';
import Productos from '../productos-interface';
import { CarritoService } from '../../carrito/carrito.service';
import { CarritoComunicacionService } from './carrito-comunicacion.service'
import { CategoriasService } from '../categorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductoDetalleDialogComponent } from './producto-detalle-dialog/producto-detalle-dialog.component';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {
  productos: Productos[] = [];
  chips: string[] = [];

   // Para el filtrado
   filteredProductos: Productos[] = [];
   selectedCategory: string | null = null;
 
  constructor(private productosService: ProductosService, 
    private carritoService: CarritoService,
    private carritoComunicacionService: CarritoComunicacionService,
    private categoriasService: CategoriasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
   ) { }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
      this.filteredProductos = productos; 
    });

    this.categoriasService.obtenerCategorias().subscribe((categorias) => {
      this.chips = categorias.map((categoria) => categoria.nombre);
    });
  }
  mostrarDetalleProducto(producto: Productos) {
    this.dialog.open(ProductoDetalleDialogComponent, {
      data: {
        foto: producto.foto,
        descripcion: producto.descripcion,
        nombre: producto.nombre,
        precio: producto.precio
      }
    });
  }
  
  agregarAlCarrito(producto: Productos) {
    if (this.carritoService.obtenerCantidadTotal() < 10) {
      this.carritoService.agregarProducto(producto);
      this.carritoComunicacionService.actualizarContador();
      this.mostrarSnackbar();
    } else {
      this.productosPermitidos();
    }
  }
  mostrarSnackbar() {
    this.snackBar.open('Agregado al pedido', '', {
      duration: 3000, // Duración en milisegundos que el Snackbar estará visible
      horizontalPosition: 'center', // Posición horizontal (start, center, end)
      verticalPosition: 'bottom', // Posición vertical (top, bottom)
      panelClass: ['no-close-button']
    });
  }
  productosPermitidos() {
    this.snackBar.open('Solo se pueden agregar hasta 10 productos al pedido', '', {
      duration: 3000, // Duración en milisegundos que el Snackbar estará visible
      horizontalPosition: 'center', // Posición horizontal (start, center, end)
      verticalPosition: 'bottom', // Posición vertical (top, bottom)
      panelClass: ['no-close-button']
    });
  }
  
  filtrarPorCategoria(categoria: string) {
    this.selectedCategory = categoria;
    if (categoria === 'Todos') {
      this.filteredProductos = this.productos; // Mostrar todos los productos
    } else {
      this.filteredProductos = this.productos.filter((producto) => producto.categoria === categoria);
    }
  }

  // Limpiar el filtro y mostrar todos los productos
  mostrarTodos() {
    this.selectedCategory = null;
    this.filteredProductos = this.productos;
  }
  
}
