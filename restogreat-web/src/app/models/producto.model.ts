import { ColaComanda } from "./colacomanda.model";
import { Grupo } from "src/app/models/grupo.model";
import { Usuario } from "./usuario.model";

export class Producto {
  public clave: string;
  public nombre: string;
  public nombreCorto?: string;
  public descripcion: string;
  public precio: Number;
  public tienePrecioAbierto: boolean;
  public imprimir: boolean;
  public colaComandas: ColaComanda;
  public img: string;
  
  public usuario: Usuario;
  public grupo?: Grupo;
  public fechaAlta?: Date;

  public fechaActualizacion?: Date;
  public _id?: string;
}
