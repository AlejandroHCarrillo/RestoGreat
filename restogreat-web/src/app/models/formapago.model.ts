export class FormaPago {
  constructor() {}

  public nombre: string;
  public clave: string;
  public tipo: string;
  public comision: Number;

  public usuario?: string;
  public fechaAlta?: Date;
  public fechaActualizacion?: Date;
  public _id?: string;
}
