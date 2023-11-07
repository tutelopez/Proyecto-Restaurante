import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './home/inicio/inicio.component';
import { MenuPageComponent } from './menu/menu-page/menu-page.component';
import { ContactoPageComponent } from './contacto/contacto-page/contacto-page.component';
import {CategoriasComponent} from './menu/categorias/categorias.component';
import {NavigationComponent} from './navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './auth/main/main.component';
import { RegisterComponent } from './auth/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', component: InicioComponent},
  { path: 'menu', component: MenuPageComponent },
  { path: 'contacto', component: ContactoPageComponent },
  {path:'categorias', component: CategoriasComponent},
  { path: 'dashboard-admin', component: NavigationComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: MainComponent},
  { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
