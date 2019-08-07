import { URL_SERVICIOS } from './../../config/config';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Seccion } from "./../../models/seccion.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from 'sweetalert2'



@Injectable()
export class SeccionService {
  seccion: Seccion;
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

  cargarSecciones(desde: number = 0) {
    let url = URL_SERVICIOS + "/seccion?desde=" + desde;
    return this.http.get(url);
  }

  obtenerSeccion(id: string) {
    let url = URL_SERVICIOS + "/seccion/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.seccion;
    });
  }

  buscarSecciones(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/seccion/" + termino;

    return this.http.get(url).map((resp: any) => resp.seccion);
  }

  crearSeccion(nombre: string) {
    console.log('Creando seccion ' + nombre);
    
    let url = URL_SERVICIOS + "/seccion?token=" + this.token ;

    return this.http.post(url, { nombre }).map((resp: any) => {
      Swal.fire("Seccion creado", resp.seccion.nombre, "success");
      return resp.seccion;
    });
  }

  actualizarSeccion(seccion: Seccion) {
    let url = URL_SERVICIOS + "/seccion/" + seccion._id;
    url += "?token=" + this.token;

    return this.http.put(url, seccion).map((resp: any) => {
      Swal.fire("Seccion actualizado", seccion.nombre, "success");
      return true;
    });
  }

  borrarSeccion(id: string) {
    let url = URL_SERVICIOS + "/seccion/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El seccion ha sido eliminado",
        "El seccion ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
