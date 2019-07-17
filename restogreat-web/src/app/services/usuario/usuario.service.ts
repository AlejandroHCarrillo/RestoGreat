import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";


// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import { throwError } from "rxjs";

import Swal from 'sweetalert2'

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken()  {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url).map((resp:any) => {
      this.token = resp.token;
      localStorage.setItem("token", resp.token);

    }).catch( err => {
      this.router.navigate(['/login']);
      Swal.fire('Error al renovar el token', 'El token no pudo ser renovado', 'error');
      return throwError(err);
    });

  }

  estaLogueado() {
    if (this.token === null || this.token === undefined ){
      return false;
    }
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));

    } else {
      this.token = "";
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu:any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.menu = [];
    this.token = "";

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menu");

    this.router.navigate(["/login"]);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token }).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    });
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario)
          .map((resp: any) => {
            console.log(resp);
            if(resp.ok){
              this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);            
              return true;
            } else{
              Swal.fire('Error en el login', resp.mensaje, 'error');  
            }
          })
          .catch( err => {
            // console.log(err.status );
            // console.log(err.error.mensaje );

            Swal.fire('Error en el login', err.error.mensaje, 'error');
            return throwError(err);
          });
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";

    return this.http.post(url, usuario)
      .map((resp: any) => {
        Swal.fire("Usuario creado", usuario.email, "success");
      return resp.usuario;
    }).catch( err => {
      Swal.fire(err.error.mensaje, err.error.errors.message, 'error');      
      return throwError(err);
    });
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario/" + usuario._id;
    url += "?token=" + this.token;

    return this.http.put(url, usuario)
      .map((resp: any) => {
        // this.usuario = resp.usuario;
        // Solo cuando actualizamos nuestro propio perfil actualiza el local storage
        if(usuario._id === this.usuario._id){
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        Swal.fire("Usuario actualizado", usuario.nombre, "success");

        return true;
    }).catch( err => {
      Swal.fire(err.error.mensaje, err.error.errors.message, 'error');      
      return throwError(err);
    });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, "usuarios", id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire("Imagen Actualizada", this.usuario.nombre, "success");
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + "/usuario?desde=" + desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/coleccion/usuario/" + termino;

    return this.http.get(url).map((resp: any) => resp.usuario);
  }

  borrarUsuario(id: string) {
    // console.log("borrando usuario");
    let url = URL_SERVICIOS + "/usuario/" + id;
    url += "?token=" + this.token;
    return this.http.delete(url).map(resp => {
      Swal.fire("El usuario ha sido eliminado", "El usuario ha sido eliminado correctamente", "success");
      return true;      
    });
  }
}
