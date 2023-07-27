import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import  Productos  from './productos-interface';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private firestore: Firestore) { }
  
  
  agregarProducto(producto: Productos) {
     const productosRef = collection(this.firestore, 'producto');
     return addDoc(productosRef, producto);
  }

}
