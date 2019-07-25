import { ColaComanda } from "src/app/models/colacomanda.model";
import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class ColacomandaService {
  colacomanda: ColaComanda;
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

  cargarColascomanda(desde: number = 0) {
    let url = URL_SERVICIOS + "/colacomanda?desde=" + desde;
    return this.http.get(url);
  }

  obtenerColacomanda(id: string) {
    let url = URL_SERVICIOS + "/colacomanda/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.colacomanda;
    });
  }

  buscarColascomanda(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/colacomanda/" + termino;

    return this.http.get(url).map((resp: any) => resp.colacomanda);
  }

  crearColacomanda(nombre: string) {
    // console.log('Creando cola de comandas' + nombre);
    
    let url = URL_SERVICIOS + "/colacomanda?token=" + this.token ;

    return this.http.post(url, { nombre }).map((resp: any) => {
      console.log(resp);
      
      Swal.fire("Cola de comandas creada", resp.colacomanda.nombre, "success");
      return resp.colacomanda;
    });
  }

  actualizarColacomanda(colacomanda: ColaComanda) {
    let url = URL_SERVICIOS + "/colacomanda/" + colacomanda._id;
    url += "?token=" + this.token;

    return this.http.put(url, colacomanda).map((resp: any) => {
      Swal.fire("Cola de comandas actualizada", colacomanda.nombre, "success");
      return true;
    });
  }

  borrarColacomanda(id: string) {
    let url = URL_SERVICIOS + "/colacomanda/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "La cola de comandas ha sido eliminado",
        "La cola de comandas ha sido eliminada correctamente",
        "success"
      );
      return true;
    });
  }
}
