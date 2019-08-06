import { Seccion } from 'src/app/models/seccion.model';
export class Rubro {
    constructor(
    ) { }

    public clave: string;
    public nombre: string;
    public seccion: Seccion;

    public usuario?: string;
    public fechaAlta: Date;
    public fechaActualizacion?: Date;
    public _id?: string;
}
