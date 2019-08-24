import { Cuenta } from 'src/app/models/cuenta.model';
import { FormaPago } from 'src/app/models/formapago.model';
export class Pago {
    constructor(
    ) { }
    public cuenta: Cuenta; 
    public formaPago : FormaPago; 
    public monto: Number; 
    public referencia: string; 
    public observaciones: string; 

    public clave?: string;        
    public usuario?: string;
    public fechaAlta?: Date;
    public fechaActualizacion?: Date;
    public _id?: string;
}
