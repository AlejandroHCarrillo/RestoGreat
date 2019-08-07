import { URL_SERVICIOS } from './../../config/config';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Turno } from "./../../models/turno.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from 'sweetalert2'

@Injectable()
export class TurnoService {
  turno: Turno;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    } else {
      this.token = "";
    }
  }

  cargarTurnos(desde: number = 0) {
    let url = URL_SERVICIOS + "/turno?desde=" + desde;
    return this.http.get(url);
  }

  obtenerTurno(id: string) {
    let url = URL_SERVICIOS + "/turno/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.turno;
    });
  }

  buscarTurnos(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/turno/" + termino;

    return this.http.get(url).map((resp: any) => resp.turno);
  }

  crearTurno(turno: Turno) {
    console.log('Creando turno: ', turno);
    
    let url = URL_SERVICIOS + "/turno?token=" + this.token ;

    return this.http.post(url, { turno }).map((resp: any) => {
      Swal.fire("Turno creado", resp.turno.nombre, "success");
      return resp.turno;
    });
  }

  actualizarTurno(turno: Turno) {
    let url = URL_SERVICIOS + "/turno/" + turno._id;
    url += "?token=" + this.token;

    return this.http.put(url, turno).map((resp: any) => {
      Swal.fire("Turno actualizado", turno.fecha.toString() , "success");
      return true;
    });
  }

  borrarTurno(id: string) {
    let url = URL_SERVICIOS + "/turno/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El turno ha sido eliminado",
        "El turno ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
