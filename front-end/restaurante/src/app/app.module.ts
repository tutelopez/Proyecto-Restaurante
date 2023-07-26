import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomeModule} from './home/home.module';
import { MenuModule } from './menu/menu.module';
import { ContactoModule } from './contacto/contacto.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    MenuModule,
    ContactoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
