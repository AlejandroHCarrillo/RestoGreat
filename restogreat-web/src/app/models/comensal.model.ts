import { Cuenta } from './cuenta.model';
import { Platillo } from "./platillo.model";

export class Comensal {
    public cuenta: Cuenta;
    public numero: number;
    public platillos: Platillo[];
    public estatus: number;

    public fechaAlta: Date;
    public usuario?: string;
    public fechaActualizacion?: Date;
    public _id?: string;
}

