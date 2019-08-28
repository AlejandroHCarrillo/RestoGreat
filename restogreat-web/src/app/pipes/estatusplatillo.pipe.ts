import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'estatusplatillo'
})
export class EsatusPlatilloPipe implements PipeTransform {

    transform(estatus: number, args?: any): any {
    switch ( estatus ) {
      case 1: return "Ordenado";
      case 2: return "Enviado a la cocina";
      case 3: return "En proceso";
      case 4: return "Listo";
      case 5: return "Entregado";
      case 6: return "Cancelado";
      default: return "Estado no desconocido";
    }
  }

}
