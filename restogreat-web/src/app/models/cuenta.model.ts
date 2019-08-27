import { Mesero } from 'src/app/models/mesero.model';
export class Cuenta {
    constructor(
    ) {
        this.mesero = new Mesero();
        this.fecha = new Date();
     }

    public consecutivo: Number;
    public fecha: Date;
    public numeromesa: Number;
    public numerocomensales: Number;
    public mesero: Mesero;
    public estatus: Number;
    
    public usuario?: string;
    public fechaAlta: Date;
    public fechaActualizacion?: Date;
    public _id?: string;
}
