import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Cuenta } from "./../../models/cuenta.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class CuentaService {
  cuenta: Cuenta;
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

  cargarCuentas(desde: number = 0) {
    let url = URL_SERVICIOS + "/cuenta?desde=" + desde;
    return this.http.get(url);
  }

  cargarCuenta(id: string) {
    let url = URL_SERVICIOS + "/cuenta/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.cuenta;
    });
  }

  buscarCuentas(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/cuenta/" + termino;

    return this.http.get(url).map((resp: any) => resp.cuenta);
  }

  obtenerCuenta(id: string) {
    let url = URL_SERVICIOS + "/cuenta/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.cuenta;
    });
  }

  crearCuenta(cuenta: Cuenta) {
    let url = URL_SERVICIOS + "/cuenta?token=" + this.token;

    return this.http.post(url, cuenta).map((resp: any) => {
      Swal.fire("Cuenta creada ", resp.cuenta.nombre, "success");
      return resp.cuenta;
    });
  }

  actualizarCuenta(cuenta: Cuenta) {
    let url = URL_SERVICIOS + "/cuenta/" + cuenta._id;
    url += "?token=" + this.token;

    return this.http.put(url, cuenta).map((resp: any) => {
      var fecha = new Date(cuenta.fecha);
      var message = 'Cuenta numero: ' + cuenta.consecutivo.toString() + ' con fecha: ' + fecha.toLocaleDateString();
      Swal.fire("Cuenta actualizada ", message, "success");
      return true;
    });
  }

  borrarCuenta(id: string) {
    let url = URL_SERVICIOS + "/cuenta/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El cuenta ha sido eliminado",
        "El cuenta ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
