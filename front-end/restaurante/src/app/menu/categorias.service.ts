import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData, getDoc } from '@angular/fire/firestore';
import Categorias from './categorias-interface';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);



@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  storageRef = firebase.app().storage().ref();
  ultimaCategoria: Categorias | null = null;

  constructor(private firestore: Firestore) { }



  agregarCategoria(categoria: Categorias) {
    const categoriasRef = collection(this.firestore, 'categoria');
    const categoriaSinId = { ...categoria }; // Crea una copia del objeto producto sin el campo 'id'
    delete categoriaSinId.id; // Elimina el campo 'id'
    return addDoc(categoriasRef, this.toFirestore(categoriaSinId)).then(docRef => {
      this.ultimaCategoria = { id: docRef.id, ...categoria }; // Guarda el última categoria agregado
    });
  }

  obtenerCategorias(): Observable<Categorias[]> {
    const categoriasRef = collection(this.firestore, 'categoria');
    return collectionData(categoriasRef, { idField: 'id' }) as Observable<Categorias[]>;
  }

  async eliminarCategoria(categoria: Categorias) {
    try {
      // Primero, eliminamos el documento de Firestore
      const categoriasRef = doc(this.firestore, `categoria/${categoria.id}`);
      await deleteDoc(categoriasRef);
  
      // Luego, eliminamos la imagen de Firebase Storage si existe en el campo 'foto'
      if (categoria.foto) {
        // Verificar si la URL de la imagen es una URL válida de Firebase Storage
        if (categoria.foto.startsWith('https://firebasestorage.googleapis.com/')) {
          // Obtener el nombre del archivo de imagen de la URL
          const imageName = categoria.foto.split('?')[0].split('/').pop();
          if (imageName) {
            // Eliminar la imagen de Firebase Storage
            const imageRef = this.storageRef.child('users/' + imageName);
            await imageRef.delete();
          }
        } else {
          console.log('La URL de la imagen no es válida para eliminar desde Firebase Storage.');
        }
      }
      console.log('Categoria y su imagen eliminados correctamente.');
    } catch (error) {
      console.error('Error al eliminar categoria y/o su imagen:', error);
    }
  }

  async actualizarCategoria(categoria: Categorias) {
    const categoriasRef = doc(this.firestore, `categoria/${categoria.id}`);
    return updateDoc(categoriasRef, this.toFirestore(categoria));
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

  ultimaCategoriaAgregada(): Categorias | null {
    return this.ultimaCategoria;
  }

  // Función para convertir un objeto en formato de Firestore
  private toFirestore(data: any) {
    return { ...data };
  }


  async actualizarCategoriaEnFirestore(categoria: Categorias) {
    try {
      const categoriaDoc = doc(this.firestore, `categoria/${categoria.id}`);
      
      // Verificar si el documento existe antes de intentar actualizarlo
      const docSnapshot = await getDoc(categoriaDoc);
      if (docSnapshot.exists()) {
        // El documento existe, entonces podemos proceder con la actualización
        await updateDoc(categoriaDoc, this.toFirestore(categoria));
        console.log('Categoria actualizado correctamente en Firestore.');
      } else {
        console.error('Error al actualizar la categoria: El documento no existe.');
      }
    } catch (error) {
      console.error('Error al actualizar la categoria:', error);
    }
  }
  


}
