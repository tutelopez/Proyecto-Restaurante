import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProductosDashboardComponent } from './productos-dashboard/productos-dashboard.component';
import { CategoriasDashboardComponent } from './categorias-dashboard/categorias-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ProductosDashboardComponent,
    CategoriasDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    DashboardPageComponent,
    ProductosDashboardComponent,
    CategoriasDashboardComponent
  ]
})
export class DashboardAdminModule { }
