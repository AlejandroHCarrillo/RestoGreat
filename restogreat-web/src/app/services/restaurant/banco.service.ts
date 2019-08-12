import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Banco } from "./../../models/banco.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class BancoService {
  banco: Banco;
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

  cargarBancos(desde: number = 0) {
    let url = URL_SERVICIOS + "/banco?desde=" + desde;
    return this.http.get(url);
  }

  cargarBanco(id: string) {
    let url = URL_SERVICIOS + "/banco/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.banco;
    });
  }

  buscarBancos(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/banco/" + termino;

    return this.http.get(url).map((resp: any) => resp.banco);
  }

  obtenerBanco(id: string) {
    let url = URL_SERVICIOS + "/banco/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.banco;
    });
  }

  crearBanco(banco: Banco) {
    let url = URL_SERVICIOS + "/banco?token=" + this.token;

    return this.http.post(url, banco).map((resp: any) => {
      Swal.fire("Banco creado", resp.banco.nombre, "success");
      return resp.banco;
    });
  }

  actualizarBanco(banco: Banco) {
    let url = URL_SERVICIOS + "/banco/" + banco._id;
    url += "?token=" + this.token;

    return this.http.put(url, banco).map((resp: any) => {
      Swal.fire("Banco actualizado", banco.nombre, "success");
      return true;
    });
  }

  borrarBanco(id: string) {
    let url = URL_SERVICIOS + "/banco/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El banco ha sido eliminado",
        "El banco ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
