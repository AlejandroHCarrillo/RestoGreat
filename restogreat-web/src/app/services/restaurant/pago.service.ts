import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Pago } from "./../../models/pago.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class PagoService {
  pago: Pago;
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

  cargarPagos(desde: number = 0) {
    let url = URL_SERVICIOS + "/pago?desde=" + desde;
    return this.http.get(url);
  }

  cargarPago(id: string) {
    let url = URL_SERVICIOS + "/pago/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.pago;
    });
  }

  buscarPagos(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/pago/" + termino;

    return this.http.get(url).map((resp: any) => resp.pago);
  }

  obtenerPago(id: string) {
    let url = URL_SERVICIOS + "/pago/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.pago;
    });
  }

  crearPago(pago: Pago) {
    let url = URL_SERVICIOS + "/pago?token=" + this.token;

    return this.http.post(url, pago).map((resp: any) => {
      Swal.fire("Pago creado", resp.pago.nombre, "success");
      return resp.pago;
    });
  }

  actualizarPago(pago: Pago) {
    let url = URL_SERVICIOS + "/pago/" + pago._id;
    url += "?token=" + this.token;

    return this.http.put(url, pago).map((resp: any) => {
      Swal.fire("Pago actualizado ", pago.cuenta.numeromesa.toString(), "success");
      return true;
    });
  }

  borrarPago(id: string) {
    let url = URL_SERVICIOS + "/pago/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El pago ha sido eliminado",
        "El pago ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
