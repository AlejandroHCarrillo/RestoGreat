import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "turno"
})
export class TurnoPipe implements PipeTransform {
  transform(idTurno: number, args?: any): any {
    switch (idTurno) {
      case 1:
        return "Desayuno";
        break;
      case 2:
        return "Comida";
        break;
      case 3:
        return "Cena";
        break;
      case 4:
        return "Buffet";
        break;
      case 5:
        return "Evento Especial";
        break;
      default:
        return "Turno no reconocido o fuera de rango 1-5";
    }
  }
}
