import { Seccion } from 'src/app/models/seccion.model';
export class Grupo {
    constructor(
        public nombre: string,
        public fechaAlta: Date,
        public seccion: string,
        public abreviacion?: string,
        public img?: string,
        public usuario?: string,
        public fechaActualizacion?: Date,
        public _id?: string
    ) { }
}
