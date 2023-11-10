import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ProductosDashboardComponent } from './productos-dashboard/productos-dashboard.component';
import { CategoriasDashboardComponent } from './categorias-dashboard/categorias-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ConfiguracionDashboardComponent } from './configuracion-dashboard/configuracion-dashboard.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ProductosDashboardComponent,
    CategoriasDashboardComponent,
    ConfiguracionDashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule ,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    DashboardPageComponent,
    ProductosDashboardComponent,
    CategoriasDashboardComponent,
    ConfiguracionDashboardComponent,
  ]
})
export class DashboardAdminModule { }
