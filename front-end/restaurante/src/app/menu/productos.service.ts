
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData, getDoc } from '@angular/fire/firestore';
import Productos from './productos-interface';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  storageRef = firebase.app().storage().ref();
  ultimoProducto: Productos | null = null;

  constructor(private firestore: Firestore) { }
  
  agregarProducto(producto: Productos) {
    const productosRef = collection(this.firestore, 'producto');
    const productoSinId = { ...producto }; // Crea una copia del objeto producto sin el campo 'id'
    delete productoSinId.id; // Elimina el campo 'id'
    return addDoc(productosRef, this.toFirestore(productoSinId)).then(docRef => {
      this.ultimoProducto = { id: docRef.id, ...producto }; // Guarda el último producto agregado
    });
  }

  obtenerProductos(): Observable<Productos[]> {
    const productosRef = collection(this.firestore, 'producto');
    return collectionData(productosRef, { idField: 'id' }) as Observable<Productos[]>;
  }

  async eliminarProducto(producto: Productos) {
    try {
      // Primero, eliminamos el documento de Firestore
      const productosRef = doc(this.firestore, `producto/${producto.id}`);
      await deleteDoc(productosRef);
  
      // Luego, eliminamos la imagen de Firebase Storage si existe en el campo 'foto'
      if (producto.foto) {
        // Verificar si la URL de la imagen es una URL válida de Firebase Storage
        if (producto.foto.startsWith('https://firebasestorage.googleapis.com/')) {
          // Obtener el nombre del archivo de imagen de la URL
          const imageName = producto.foto.split('?')[0].split('/').pop();
          if (imageName) {
            // Eliminar la imagen de Firebase Storage
            const imageRef = this.storageRef.child('users/' + imageName);
            await imageRef.delete();
          }
        } else {
          console.log('La URL de la imagen no es válida para eliminar desde Firebase Storage.');
        }
      }
  
      console.log('Producto y su imagen eliminados correctamente.');
    } catch (error) {
      console.error('Error al eliminar producto y/o su imagen:', error);
    }
  }
  
  

  async actualizarProducto(producto: Productos) {
    console.log('ID del producto al enviar el formulario:', producto.id);
    const productosRef = doc(this.firestore, `producto/${producto.id}`);
    return updateDoc(productosRef, this.toFirestore(producto));
  }

  async actualizarProductoEnFirestore(producto: Productos) {
    try {
      const productoDoc = doc(this.firestore, `producto/${producto.id}`);
      
      // Verificar si el documento existe antes de intentar actualizarlo
      const docSnapshot = await getDoc(productoDoc);
      if (docSnapshot.exists()) {
        // El documento existe, entonces podemos proceder con la actualización
        await updateDoc(productoDoc, this.toFirestore(producto));
        console.log('Producto actualizado correctamente en Firestore.');
      } else {
        console.error('Error al actualizar el producto: El documento no existe.');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
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

  ultimoProductoAgregado(): Productos | null {
    return this.ultimoProducto;
  }

  // Función para convertir un objeto en formato de Firestore
  private toFirestore(data: any) {
    return { ...data };
  }
}