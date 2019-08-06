export class Cliente {
    constructor(
    ) { }

    public rfc: string;
    public nombre: string;
    public direccionCalle: string;
    public direccionNumero: string;
    public direccionColonia: string;
    public direccionMunicipio: string;
    public direccionEstado: string;
    public direccionCP: string;
    public correoelectronico: string;
    public telefono: string;
    public usuario?: string;
    public fechaAlta?: Date;
    public fechaActualizacion?: Date;
    public _id?: string;
}
