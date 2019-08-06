import { Rubro } from "./rubro.model";

export class Modificador {
    constructor(
        ) { }
    
        public clave: string;
        public nombre: string;
        public rubro: Rubro;
        
        public usuario?: string;
        public fechaAlta: Date;
        public fechaActualizacion?: Date;
        public _id?: string;
}
