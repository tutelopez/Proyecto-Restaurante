import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/menu/categorias.service';
import { Observable } from 'rxjs';
import Categorias from '../../menu/categorias-interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categorias-dashboard',
  templateUrl: './categorias-dashboard.component.html',
  styleUrls: ['./categorias-dashboard.component.css'],
})
export class CategoriasDashboardComponent implements OnInit {
  ngOnInit(): void {
    this.obtenerCategorias();
  }

  categoriasTabla = new MatTableDataSource<Categorias>();
  displayedColumns: string[] = ['id', 'nombre', 'foto', 'accion'];

  mostrarFormulario: boolean = false;
  formulario: FormGroup;
  categorias: Observable<Categorias[]>;
  urlImagenes: { [key: string]: string } = {};
  lastKey: string | null = null;
  formularioEnviado: boolean = false;

  constructor(private categoriasService: CategoriasService) {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      foto: new FormControl(null, Validators.required),
    });
    this.categorias = new Observable<Categorias[]>();
  }

  obtenerCategorias() {
    this.categorias = this.categoriasService.obtenerCategorias();
    this.categorias.subscribe((categorias) => {
      // Asignar un valor de 'id' a las categorías que no lo tienen
      categorias.forEach((categoria, index) => {
        if (!categoria.id) {
          categoria.id = `${index + 1}`; // Puedes generar un 'id' temporal aquí
        }
        this.urlImagenes[categoria.id] = categoria.foto || '';
        this.lastKey = categoria.id;
      });
      // Asignar las categorías al origen de datos de la tabla
      this.categoriasTabla.data = categorias;
      console.log('urlImagenes:', this.urlImagenes);
    });
  }

  async eliminarCategoria(categoria: Categorias) {
    const response = await this.categoriasService.eliminarCategoria(categoria);
    console.log(response);
    this.obtenerCategorias();
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const nuevaCategoria: Categorias = {
        nombre: this.formulario.value.nombre,
        foto: this.lastKey !== null ? this.urlImagenes[this.lastKey] : null,
      };
      const response = await this.categoriasService.agregarCategoria(
        nuevaCategoria
      );
      console.log('Respuesta del servicio:', response);
      this.formulario.reset();
      this.formularioEnviado = false;
      this.mostrarFormulario = false;
      this.obtenerCategorias();
    }
  }

  imagenes: any[] = [];
  async cargarImagen(event: any) {
    let archivos = event.target.files;
    let reader = new FileReader();
    let nombre = 'mateo';
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = async () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
      const timestamp = Date.now();
      const key = `image_${nombre}_${timestamp}`;
      const urlImagen = await this.categoriasService.subirImagen(
        nombre + '_' + timestamp,
        reader.result
      );
      if (urlImagen !== null) {
        console.log(urlImagen);
        this.urlImagenes[key] = urlImagen;
        this.lastKey = key;
      } else {
        console.log('Error al obtener la URL de la imagen desde Firebase Storage.');
      }
    };
  }
}
