import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
         url += '/hospitales/' + img;
      break;

      case 'seccion':
         url += '/secciones/' + img;
      break;

      case 'grupo':
         url += '/grupos/' + img;
      break;

      case 'producto':
        url += '/productos/' + img;
      break;

      case 'mesero':
        url += '/meseros/' + img;
      break;

      case 'areaventa':
        url += '/areasventa/' + img;
      break;
      
      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }
    // console.log(url);    
    return url;
  }

}
