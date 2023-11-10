import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData, getDoc } from '@angular/fire/firestore';
import Restaurante from './interface/configuracion-interface';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);



@Injectable({
  providedIn: 'root'
})



export class ConfiguracionService {
  storageRef = firebase.app().storage().ref();
  ultimoRestaurante: Restaurante | null = null;
  constructor(private firestore: Firestore) { }

  private toFirestore(data: any) {
    return { ...data };
  }

  agregarRestaurante(restaurante: Restaurante) {
    const restauranteRef = collection(this.firestore, 'restaurante');
    const restauranteSinId = { ...restaurante }; // Crea una copia del objeto producto sin el campo 'id'
    delete restauranteSinId.id; // Elimina el campo 'id'
    return addDoc(restauranteRef, this.toFirestore(restauranteSinId)).then(docRef => {
      this.ultimoRestaurante = { id: docRef.id, ...restaurante }; // Guarda el última categoria agregado
    });
  }
  ultimoRestauranteAgregado(): Restaurante | null {
    return this.ultimoRestaurante;
  }














}
