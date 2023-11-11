import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc, query, getDocs, docData, DocumentSnapshot, DocumentData } from '@angular/fire/firestore';
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
  restauranteDoc: Restaurante | null = null;
  

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

  async subirImagen(nombre: string, imgBase64: any) {
    try {
      let respuesta = await this.storageRef.child("users/" + nombre).putString(imgBase64, 'data_url');
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }

  async actualizarDatosEnFirestore(restaurante: Restaurante) {
    try {
      const restauranteDoc = doc(this.firestore, `restaurantes/${restaurante.id}`);
      
      // Verificar si el documento existe antes de intentar actualizarlo
      const docSnapshot = await getDoc(restauranteDoc);
      if (docSnapshot.exists()) {
        // El documento existe, entonces podemos proceder con la actualización
        await updateDoc(restauranteDoc, this.toFirestore(restaurante));
        console.log('Datos actualizados correctamente en Firestore.');
      } else {
        console.error('Error al actualizar datos: El documento no existe.');
      }
    } catch (error) {
      console.error('Error al actualizar datos:', error);
    }
  }



 // IMPLEMENTACION NUEVA

 
 async verificarYActualizarRestaurante(restaurante: Restaurante) {
  try {
    const restaurantesCollectionRef = collection(this.firestore, 'restaurantes');

    const querySnapshot = await getDocs(restaurantesCollectionRef);
    if (!querySnapshot.empty) {
      // Si hay documentos en la colección, toma el primero (índice 0)
      const primerRestaurante = querySnapshot.docs[0];
      const restauranteDoc = doc(this.firestore, `restaurantes/${primerRestaurante.id}`);
      
      // Actualiza los datos del primer restaurante
      await updateDoc(restauranteDoc, this.toFirestore(restaurante));
      console.log('Restaurante actualizado correctamente en Firestore.');
    } else {
      // Si no hay documentos en la colección, crea uno nuevo
      await addDoc(restaurantesCollectionRef, restaurante);
      console.log('Restaurante creado correctamente en Firestore.');
    }

    this.restauranteDoc = restaurante;
  } catch (error) {
    console.error('Error al verificar y actualizar el restaurante:', error);
  }
}



  obtenerRestaurante(): Observable<Restaurante | null> {
    const restauranteDocRef = doc(this.firestore, 'restaurantes/restaurante');
    return docData(restauranteDocRef) as Observable<Restaurante | null>;
  }
  obtenerColeccionRestaurantes(): Observable<Restaurante[]> {
    const restauranteCollectionRef = collection(this.firestore, 'restaurantes');
    return collectionData(restauranteCollectionRef) as Observable<Restaurante[]>;
  }

}
