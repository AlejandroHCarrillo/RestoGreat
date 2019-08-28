import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Comensal } from "./../../models/comensal.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class ComensalService {
  comensal: Comensal;
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

  cargarComensales(idCuenta : string) {
    let url = URL_SERVICIOS + "/comensal/cuenta/" + idCuenta;
    return this.http.get(url);
  }

  cargarComensal(id: string) {
    let url = URL_SERVICIOS + "/comensal/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.comensal;
    });
  }

  buscarComensales(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/comensal/" + termino;
    return this.http.get(url).map((resp: any) => resp.comensal);
  }

  obtenerComensal(id: string) {
    let url = URL_SERVICIOS + "/comensal/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.comensal;
    });
  }

  crearComensal(comensal: Comensal) {
    let url = URL_SERVICIOS + "/comensal?token=" + this.token;

    return this.http.post(url, comensal).map((resp: any) => {
      Swal.fire("Comensal creado", resp.comensal.nombre, "success");
      return resp.comensal;
    });
  }

  actualizarComensal(comensal: Comensal) {
    let url = URL_SERVICIOS + "/comensal/" + comensal._id;
    url += "?token=" + this.token;

    return this.http.put(url, comensal).map((resp: any) => {
      Swal.fire("Comensal actualizado", comensal.numero.toString(), "success");
      return true;
    });
  }

  borrarComensal(id: string) {
    let url = URL_SERVICIOS + "/comensal/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El comensal ha sido eliminado",
        "El comensal ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
