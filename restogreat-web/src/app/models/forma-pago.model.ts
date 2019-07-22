export class FormaPago {
    constructor(
        public nombre: string,
        public fechaAlta: Date,

        public clave?: string,        
        public usuario?: string,
        public fechaActualizacion?: Date,
        public _id?: string
    ) { }
}
