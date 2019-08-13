import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Conceptodescuento } from "./../../models/conceptodescuento.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class ConceptodescuentoService {
  conceptodescuento: Conceptodescuento;
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

  cargarConceptosdescuento(desde: number = 0) {
    let url = URL_SERVICIOS + "/conceptodescuento?desde=" + desde;
    return this.http.get(url);
  }

  cargarConceptodescuento(id: string) {
    let url = URL_SERVICIOS + "/conceptodescuento/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.conceptodescuento;
    });
  }

  buscarConceptosdescuento(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/conceptodescuento/" + termino;

    return this.http.get(url).map((resp: any) => resp.conceptodescuento);
  }

  obtenerConceptodescuento(id: string) {
    let url = URL_SERVICIOS + "/conceptodescuento/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.conceptodescuento;
    });
  }

  crearConceptodescuento(conceptodescuento: Conceptodescuento) {
    let url = URL_SERVICIOS + "/conceptodescuento?token=" + this.token;

    return this.http.post(url, conceptodescuento).map((resp: any) => {
      Swal.fire("Conceptodescuento creado", resp.conceptodescuento.nombre, "success");
      return resp.conceptodescuento;
    });
  }

  actualizarConceptodescuento(conceptodescuento: Conceptodescuento) {
    let url = URL_SERVICIOS + "/conceptodescuento/" + conceptodescuento._id;
    url += "?token=" + this.token;

    return this.http.put(url, conceptodescuento).map((resp: any) => {
      Swal.fire("Conceptodescuento actualizado", conceptodescuento.nombre, "success");
      return true;
    });
  }

  borrarConceptodescuento(id: string) {
    let url = URL_SERVICIOS + "/conceptodescuento/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El conceptodescuento ha sido eliminado",
        "El conceptodescuento ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
