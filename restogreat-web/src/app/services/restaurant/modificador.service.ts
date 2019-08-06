import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Modificador } from "./../../models/modificador.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class ModificadorService {
  modificador: Modificador;
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

  cargarModificadores(desde: number = 0) {
    let url = URL_SERVICIOS + "/modificador?desde=" + desde;
    return this.http.get(url);
  }

  cargarModificador(id: string) {
    let url = URL_SERVICIOS + "/modificador/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.modificador;
    });
  }

  buscarModificadores(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/modificador/" + termino;

    return this.http.get(url).map((resp: any) => resp.modificador);
  }

  obtenerModificador(id: string) {
    let url = URL_SERVICIOS + "/modificador/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.modificador;
    });
  }

  crearModificador(modificador: Modificador) {
    console.log(modificador);
    
    let url = URL_SERVICIOS + "/modificador?token=" + this.token;

    return this.http.post(url, modificador).map((resp: any) => {
      Swal.fire("Modificador creado", resp.modificador.nombre, "success");
      return resp.modificador;
    });
  }

  actualizarModificador(modificador: Modificador) {
    let url = URL_SERVICIOS + "/modificador/" + modificador._id;
    url += "?token=" + this.token;

    return this.http.put(url, modificador).map((resp: any) => {
      Swal.fire("Modificador actualizado", modificador.nombre, "success");
      return true;
    });
  }

  borrarModificador(id: string) {
    let url = URL_SERVICIOS + "/modificador/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El modificador ha sido eliminado",
        "El modificador ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
