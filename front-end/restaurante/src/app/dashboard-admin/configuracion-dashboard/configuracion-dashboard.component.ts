import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Restaurante from './interface/configuracion-interface';

@Component({
  selector: 'app-configuracion-dashboard',
  templateUrl: './configuracion-dashboard.component.html',
  styleUrls: ['./configuracion-dashboard.component.css']
})
export class ConfiguracionDashboardComponent implements OnInit {
  constructor(private configuracionService: ConfiguracionService) {
    this.restaurante = null;
    this.formularioEdicion = new FormGroup({
      nombre: new FormControl('', Validators.required),
      numeroTel: new FormControl('', Validators.required),
      foto: new FormControl(null), // Inicializar con null
    });
  

  }
  

  async ngOnInit(): Promise<void> {
   

    
    await this.obtenerPrimerRestauranteDeLaColeccion();

   
  
  console.log('oninit Primer restaurante de la colección:', this.primerRestaurante);
  }

  restaurantes: Restaurante[] = [];
  primerRestaurante: Restaurante | null = null;

  formularioEdicion: FormGroup;
  imagenes: any[] = [];
  urlImagenes: { [key: string]: string } = {};
  imagenCargada: boolean = true;
  botonGuardarHabilitado: boolean = true;
  lastKey: string | null = null;

  async cargarImagen(event: any) {
    let archivos = event.target.files;
    let reader = new FileReader();
    let nombre = 'datos-restaurante';

    reader.readAsDataURL(archivos[0]);

    reader.onloadend = async () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);

      const timestamp = Date.now();
      const key = `image_${nombre}_${timestamp}`;

      try {
        this.botonGuardarHabilitado = false;

        const urlImagen = await this.configuracionService.subirImagen(
          nombre + '_' + timestamp,
          reader.result
        );

        if (urlImagen !== null) {
          this.imagenCargada = false;
          console.log(urlImagen);
          this.urlImagenes[key] = urlImagen;
          this.lastKey = key;
          this.imagenCargada = true;
        } else {
          console.log('Error al obtener la URL de la imagen desde Firebase Storage.');
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      } finally {
        this.botonGuardarHabilitado = true;
        this.formularioEdicion.controls['foto'].enable();
      }
    };
  }

  restaurante: Restaurante | null;

  
  guardarCambios() {
    if (this.formularioEdicion.valid) {
      const nombre = this.formularioEdicion.get('nombre')?.value || '';
      const numeroTel = this.formularioEdicion.get('numeroTel')?.value || '';
  
      if (this.restaurante) {
        const fotoEditada = this.imagenCargada ? 
          (this.lastKey !== null ? this.urlImagenes[this.lastKey] : null) : 
          (this.restaurante.foto || null); // Mantener la foto existente si no se carga una nueva
        
        const restauranteActualizado: Restaurante = {
          id: this.restaurante.id,
          nombre: this.formularioEdicion.value.nombre,
          numeroTel: this.formularioEdicion.value.numeroTel,
          foto: fotoEditada,
        };
  
        console.log('Restaurante Actualizado:', restauranteActualizado);
  
        this.configuracionService.verificarYActualizarRestaurante(restauranteActualizado);
      } else {
        // No se encontró un restaurante, así que crea uno nuevo
        const nuevoRestaurante: Restaurante = {
          nombre,
          numeroTel,
          foto: this.lastKey !== null ? this.urlImagenes[this.lastKey] : null,
        };
  
        console.log('Nuevo Restaurante:', nuevoRestaurante);
  
        this.configuracionService.verificarYActualizarRestaurante(nuevoRestaurante);
      }
      this.formularioEdicion.reset();
      this.obtenerPrimerRestauranteDeLaColeccion();
    }
  }
  
  obtenerPrimerRestauranteDeLaColeccion() {
    this.configuracionService.obtenerColeccionRestaurantes().subscribe((restaurantes) => {
      if (restaurantes.length > 0) {
        this.primerRestaurante = restaurantes[0];
        this.formularioEdicion.setValue({
          nombre: this.primerRestaurante.nombre,
          numeroTel: this.primerRestaurante.numeroTel,
          foto: this.primerRestaurante.foto,
        });
        console.log('FUNCION RESTAURANTE COLLECT Primer restaurante de la colección:', this.primerRestaurante);
        console.log('FUNCION RESTAURANTE COLLECT Datos precargados en el formulario:', this.formularioEdicion.value);
      }
    });
  }
}

