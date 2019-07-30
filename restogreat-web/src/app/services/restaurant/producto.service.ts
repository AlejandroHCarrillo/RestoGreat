import { URL_SERVICIOS } from './../../config/config';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Producto } from "./../../models/producto.model";
import { Injectable } from "@angular/core";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import Swal from 'sweetalert2'

@Injectable()
export class ProductoService {
  producto: Producto;
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

  cargarProductos(desde: number = 0) {
    let url = URL_SERVICIOS + "/producto?desde=" + desde;
    return this.http.get(url);
  }

  cargarProducto(id: string) {
    let url = URL_SERVICIOS + "/producto/" + id;
    return this.http.get(url).map((resp: any) => {
      return resp.producto;
    });
  }

  buscarProductos(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/producto/" + termino;

    return this.http.get(url).map((resp: any) => resp.producto);
  }

  crearProducto(producto: Producto) {
    let url = URL_SERVICIOS + "/producto?token=" + this.token ;

    return this.http.post(url, producto ).map((resp: any) => {
      Swal.fire("Producto creado", resp.producto.nombre, "success");
      return resp.producto;
    });
  }

  actualizarProducto(producto: Producto) {
    let url = URL_SERVICIOS + "/producto/" + producto._id;
    url += "?token=" + this.token;

    return this.http.put(url, producto).map((resp: any) => {
      Swal.fire("Producto actualizado", producto.nombre, "success");
      return true;
    });
  }

  borrarProducto(id: string) {
    let url = URL_SERVICIOS + "/producto/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire(
        "El producto ha sido eliminado",
        "El producto ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }
}
