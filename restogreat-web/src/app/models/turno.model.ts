import { Mesero } from './mesero.model';
export class Turno {
    constructor() {
        this.fecha = new Date(),
        this.numero = 1,
        this.fondocaja = 0,
        this.mesero = new Mesero();
     }

    //  constructor( fecha, numero ) {
    //     this.fecha = fecha,
    //     this.numero = numero
    //  }

    public fecha: Date;
    public numero: Number;
    public mesero: Mesero;
    public fondocaja: Number;
    
    public usuario?: string;
    public fechaActualizacion?: Date;
    public fechaAlta?: Date;
    public _id?: string
}