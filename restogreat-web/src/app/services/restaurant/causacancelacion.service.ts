import { URL_SERVICIOS } from './../../config/config';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Causacancelacion } from "./../../models/causacancelacion.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from 'sweetalert2'



@Injectable()
export class CausacancelacionService {
  causacancelacion: Causacancelacion;
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

  cargarCausascancelacion(desde: number = 0) {
    let url = URL_SERVICIOS + "/causacancelacion?desde=" + desde;
    return this.http.get(url);
  }

  obtenerCausacancelacion(id: string) {
    let url = URL_SERVICIOS + "/causacancelacion/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.causacancelacion;
    });
  }

  buscarCausascancelacion(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/causacancelacion/" + termino;

    return this.http.get(url).map((resp: any) => resp.causacancelacion);
  }

  crearCausacancelacion(nombre: string) {
    console.log('Creando causa de cancelacion ' + nombre);
    
    let url = URL_SERVICIOS + "/causacancelacion?token=" + this.token ;

    return this.http.post(url, { nombre }).map((resp: any) => {
      Swal.fire("Causacancelacion creado", resp.causacancelacion.nombre, "success");
      return resp.causacancelacion;
    });
  }

  actualizarCausacancelacion(causacancelacion: Causacancelacion) {
    let url = URL_SERVICIOS + "/causacancelacion/" + causacancelacion._id;
    url += "?token=" + this.token;

    return this.http.put(url, causacancelacion).map((resp: any) => {
      Swal.fire("Causacancelacion actualizado", causacancelacion.nombre, "success");
      return true;
    });
  }

  borrarCausacancelacion(id: string) {
    let url = URL_SERVICIOS + "/causacancelacion/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El causacancelacion ha sido eliminado",
        "El causacancelacion ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
