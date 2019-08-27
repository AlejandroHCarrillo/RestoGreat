import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Mesero } from "./../../models/mesero.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class MeseroService {
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

  cargarMeseros(desde: number = 0) {
    let url = URL_SERVICIOS + "/mesero?desde=" + desde;
    return this.http.get(url);
  }

  cargarListaMeseros(filtro?: string) {
    let url = URL_SERVICIOS + "/mesero/lista/filtro=" + filtro || "";
    return this.http.get(url);
  }


  cargarCajeros() {
    let url = URL_SERVICIOS + "/mesero/cajeros";
    return this.http.get(url);
  }

  cargarMesero(id: string) {
    let url = URL_SERVICIOS + "/mesero/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.mesero;
    });
  }

  cargarMeseroPorUsuarioId(id: string) {
    let url = URL_SERVICIOS + "/mesero/usuario/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.mesero[0];
    });
  }


  buscarMeseros(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/mesero/" + termino;

    return this.http.get(url).map((resp: any) => resp.mesero);
  }

  obtenerMesero(id: string) {
    let url = URL_SERVICIOS + "/mesero/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.mesero;
    });
  }

  crearMesero(mesero: Mesero) {
    let url = URL_SERVICIOS + "/mesero?token=" + this.token;
    let nombrecompleto : string = mesero.nombre + ' ' + mesero.apaterno  + ' ' + mesero.amaterno ;

    return this.http.post(url, mesero).map((resp: any) => {
      Swal.fire("Mesero creado", nombrecompleto, "success");
      return resp.mesero;
    });
  }

  actualizarMesero(mesero: Mesero) {
    let url = URL_SERVICIOS + "/mesero/" + mesero._id;
    let nombrecompleto : string = mesero.nombre + ' ' + mesero.apaterno  + ' ' + mesero.amaterno ;

    url += "?token=" + this.token;

    return this.http.put(url, mesero).map((resp: any) => {
      Swal.fire("Mesero actualizado", nombrecompleto, "success");
      return true;
    });
  }

  borrarMesero(id: string) {
    let url = URL_SERVICIOS + "/mesero/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El mesero ha sido eliminado",
        "El mesero ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
