import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProductosDashboardComponent } from './productos-dashboard/productos-dashboard.component';
import { CategoriasDashboardComponent } from './categorias-dashboard/categorias-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ProductosDashboardComponent,
    CategoriasDashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule, 
  ],
  exports: [
    DashboardPageComponent,
    ProductosDashboardComponent,
    CategoriasDashboardComponent
  ]
})
export class DashboardAdminModule { }
