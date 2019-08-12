import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AreaVenta } from "./../../models/areaventa.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class AreaventaService {
  areaventa: AreaVenta;
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

  cargarAreasventa(desde: number = 0) {
    let url = URL_SERVICIOS + "/areaventa?desde=" + desde;
    return this.http.get(url);
  }

  cargarAreaventa(id: string) {
    let url = URL_SERVICIOS + "/areaventa/" + id;
    return this.http.get(url).map((resp: any) => {
      // console.log(resp);
      
      return resp.areaventa;
    });
  }

  buscarAreasventa(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/areaventa/" + termino;

    return this.http.get(url).map((resp: any) => resp.areaventa);
  }

  obtenerAreaventa(id: string) {
    let url = URL_SERVICIOS + "/areaventa/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.areaventa;
    });
  }

  crearAreaventa(areaventa: AreaVenta) {
    let url = URL_SERVICIOS + "/areaventa?token=" + this.token;

    return this.http.post(url, areaventa).map((resp: any) => {
      Swal.fire("Area de venta creada", areaventa.nombre, "success");
      return resp.areaventa;
    });
  }

  actualizarAreaventa(areaventa: AreaVenta) {
    let url = URL_SERVICIOS + "/areaventa/" + areaventa._id;
    url += "?token=" + this.token;

    return this.http.put(url, areaventa).map((resp: any) => {
      Swal.fire("Area de venta actualizada", areaventa.nombre, "success");
      return true;
    });
  }

  borrarAreaventa(id: string) {
    let url = URL_SERVICIOS + "/areaventa/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El areaventa ha sido eliminado",
        "El areaventa ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
