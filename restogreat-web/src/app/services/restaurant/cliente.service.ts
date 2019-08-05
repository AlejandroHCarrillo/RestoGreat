import { URL_SERVICIOS } from "./../../config/config";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Cliente } from "./../../models/cliente.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from "sweetalert2";

@Injectable()
export class ClienteService {
  cliente: Cliente;
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

  cargarClientes(desde: number = 0) {
    let url = URL_SERVICIOS + "/cliente?desde=" + desde;
    return this.http.get(url);
  }

  cargarCliente(id: string) {
    let url = URL_SERVICIOS + "/cliente/" + id;
    return this.http.get(url).map((resp: any) => {
      console.log(resp);
      
      return resp.cliente;
    });
  }

  buscarClientes(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/cliente/" + termino;

    return this.http.get(url).map((resp: any) => resp.cliente);
  }

  obtenerCliente(id: string) {
    let url = URL_SERVICIOS + "/cliente/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.cliente;
    });
  }

  crearCliente(cliente: Cliente) {
    let url = URL_SERVICIOS + "/cliente?token=" + this.token;

    return this.http.post(url, cliente).map((resp: any) => {
      Swal.fire("Area de venta creada", cliente.nombre, "success");
      return resp.cliente;
    });
  }

  actualizarCliente(cliente: Cliente) {
    let url = URL_SERVICIOS + "/cliente/" + cliente._id;
    url += "?token=" + this.token;

    return this.http.put(url, cliente).map((resp: any) => {
      Swal.fire("Area de venta actualizada", cliente.nombre, "success");
      return true;
    });
  }

  borrarCliente(id: string) {
    let url = URL_SERVICIOS + "/cliente/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El cliente ha sido eliminado",
        "El cliente ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
