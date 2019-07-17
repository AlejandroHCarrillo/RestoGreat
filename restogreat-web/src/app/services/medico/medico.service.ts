import { URL_SERVICIOS } from './../../config/config';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Medico } from "./../../models/medico.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from 'sweetalert2'

@Injectable()
export class MedicoService {
  medico: Medico;
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

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + "/medico?desde=" + desde;
    return this.http.get(url);
  }

  cargarMedico(id: string) {
    let url = URL_SERVICIOS + "/medico/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.medico;
    });
  }

  buscarMedicos(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/medico/" + termino;

    return this.http.get(url).map((resp: any) => resp.medico);
  }

  crearMedico(medico: Medico) {
    let url = URL_SERVICIOS + "/medico?token=" + this.token ;

    return this.http.post(url, medico ).map((resp: any) => {
      Swal.fire("Medico creado", resp.medico.nombre, "success");
      return resp.medico;
    });
  }

  actualizarMedico(medico: Medico) {
    let url = URL_SERVICIOS + "/medico/" + medico._id;
    url += "?token=" + this.token;

    return this.http.put(url, medico).map((resp: any) => {
      Swal.fire("Medico actualizado", medico.nombre, "success");
      return true;
    });
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + "/medico/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El medico ha sido eliminado",
        "El medico ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
