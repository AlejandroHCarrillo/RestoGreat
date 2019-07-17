export class ParametroConfiguracion {
    constructor(
        public nombre: string,
        public fechaAlta: Date,

        public abreviacion?: string,        
        public usuario?: string,
        public fechaActualizacion?: Date,
        public _id?: string
    ) { }
}
