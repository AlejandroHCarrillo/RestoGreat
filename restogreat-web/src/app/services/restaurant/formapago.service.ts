import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormaPago } from "./../../models/formapago.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class FormaPagoService {
  formapago: FormaPago;
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

  cargarFormaspago(desde: number = 0) {
    let url = URL_SERVICIOS + "/formapago?desde=" + desde;
    return this.http.get(url);
  }

  cargarFormapago(id: string) {
    console.log("Service cargar forma de pago con el id: " + id );
    
    let url = URL_SERVICIOS + "/formapago/" + id;
    return this.http.get(url).map((resp: any) => {
      console.log(resp);
      
      return resp.formapago;
    });
  }

  buscarFormaspago(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/formapago/" + termino;

    return this.http.get(url).map((resp: any) => resp.formapago);
  }

  obtenerFormapago(id: string) {
    let url = URL_SERVICIOS + "/formapago/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.formapago;
    });
  }

  crearFormapago(formapago: FormaPago) {
    let url = URL_SERVICIOS + "/formapago?token=" + this.token;

    return this.http.post(url, formapago).map((resp: any) => {
      Swal.fire("Formapago creado", formapago.nombre, "success");
      return resp.formapago;
    });
  }

  actualizarFormapago(formapago: FormaPago) {
    let url = URL_SERVICIOS + "/formapago/" + formapago._id;
    url += "?token=" + this.token;

    return this.http.put(url, formapago).map((resp: any) => {
      Swal.fire("Formapago actualizado", formapago.nombre, "success");
      return true;
    });
  }

  borrarFormapago(id: string) {
    let url = URL_SERVICIOS + "/formapago/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El formapago ha sido eliminado",
        "El formapago ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
