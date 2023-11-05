export default interface Productos {
    id?: string;
    nombre: string;
    precio: number;
    descripcion: string;
    foto: string | null;
    categoria: string; 
}