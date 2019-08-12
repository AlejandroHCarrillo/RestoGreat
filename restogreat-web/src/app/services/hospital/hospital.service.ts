import { URL_SERVICIOS } from './../../config/config';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Hospital } from "./../../models/hospital.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from 'sweetalert2'



@Injectable()
export class HospitalService {
  hospital: Hospital;
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

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + "/hospital?desde=" + desde;
    return this.http.get(url);
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.hospital;
    });
  }

  buscarHospitales(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/hospital/" + termino;

    return this.http.get(url).map((resp: any) => resp.hospital);
  }

  crearHospital(nombre: string) {
    // console.log('Creando hospital ' + nombre);
    
    let url = URL_SERVICIOS + "/hospital?token=" + this.token ;

    return this.http.post(url, { nombre }).map((resp: any) => {
      Swal.fire("Hospital creado", resp.hospital.nombre, "success");
      return resp.hospital;
    });
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    url += "?token=" + this.token;

    return this.http.put(url, hospital).map((resp: any) => {
      Swal.fire("Hospital actualizado", hospital.nombre, "success");
      return true;
    });
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El hospital ha sido eliminado",
        "El hospital ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
