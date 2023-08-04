import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarritoComunicacionService {

  

  private actualizarContadorSubject = new Subject<void>();

  actualizarContador$ = this.actualizarContadorSubject.asObservable();

  actualizarContador() {
    this.actualizarContadorSubject.next();
  }

}
