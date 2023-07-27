import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { MenuPageComponent } from './menu/menu-page/menu-page.component';
import { ContactoPageComponent } from './contacto/contacto-page/contacto-page.component';
import {CategoriasComponent} from './menu/categorias/categorias.component';
import { DashboardPageComponent } from './dashboard-admin/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'menu', component: MenuPageComponent },
  { path: 'contacto', component: ContactoPageComponent },
  {path:'categorias', component: CategoriasComponent},
  { path:'dashboard', component: DashboardPageComponent},
  { path: '**', redirectTo: '/inicio' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
