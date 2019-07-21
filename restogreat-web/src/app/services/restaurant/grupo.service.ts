import { URL_SERVICIOS } from './../../config/config';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Grupo } from "./../../models/grupo.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from 'sweetalert2'

@Injectable()
export class GrupoService {
  grupo: Grupo;
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

  cargarGrupos(desde: number = 0) {
    let url = URL_SERVICIOS + "/grupo?desde=" + desde;
    return this.http.get(url);
  }

  cargarGrupo(id: string) {
    let url = URL_SERVICIOS + "/grupo/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.grupo;
    });
  }

  buscarGrupos(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/grupo/" + termino;

    return this.http.get(url).map((resp: any) => resp.grupo);
  }

  crearGrupo(grupo: Grupo) {
    let url = URL_SERVICIOS + "/grupo?token=" + this.token ;

    return this.http.post(url, grupo ).map((resp: any) => {
      Swal.fire("Grupo creado", resp.grupo.nombre, "success");
      return resp.grupo;
    });
  }

  actualizarGrupo(grupo: Grupo) {
    let url = URL_SERVICIOS + "/grupo/" + grupo._id;
    url += "?token=" + this.token;

    return this.http.put(url, grupo).map((resp: any) => {
      Swal.fire("Grupo actualizado", grupo.nombre, "success");
      return true;
    });
  }

  borrarGrupo(id: string) {
    let url = URL_SERVICIOS + "/grupo/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El grupo ha sido eliminado",
        "El grupo ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
