import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Rubro } from "./../../models/rubro.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class RubroService {
  rubro: Rubro;
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

  cargarRubros(desde: number = 0) {
    let url = URL_SERVICIOS + "/rubro?desde=" + desde;
    return this.http.get(url);
  }

  cargarRubro(id: string) {
    let url = URL_SERVICIOS + "/rubro/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.rubro;
    });
  }

  buscarRubros(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/rubro/" + termino;

    return this.http.get(url).map((resp: any) => resp.rubro);
  }

  obtenerRubro(id: string) {
    let url = URL_SERVICIOS + "/rubro/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.rubro;
    });
  }

  crearRubro(rubro: Rubro) {
    let url = URL_SERVICIOS + "/rubro?token=" + this.token;

    return this.http.post(url, rubro).map((resp: any) => {
      Swal.fire("Rubro creado", resp.rubro.nombre, "success");
      return resp.rubro;
    });
  }

  actualizarRubro(rubro: Rubro) {
    let url = URL_SERVICIOS + "/rubro/" + rubro._id;
    url += "?token=" + this.token;

    return this.http.put(url, rubro).map((resp: any) => {
      Swal.fire("Rubro actualizado", rubro.nombre, "success");
      return true;
    });
  }

  borrarRubro(id: string) {
    let url = URL_SERVICIOS + "/rubro/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El rubro ha sido eliminado",
        "El rubro ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
