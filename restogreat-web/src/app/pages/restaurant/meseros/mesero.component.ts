import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Mesero } from "src/app/models/mesero.model";
import {
  SeccionService,
  MeseroService,
  UsuarioService
} from "src/app/services/service.index";
import { Seccion } from "./../../../models/seccion.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-mesero",
  templateUrl: "./mesero.component.html",
  styles: []
})
export class MeseroComponent implements OnInit {
  seccion: Seccion = new Seccion("", new Date());
  secciones: Seccion[] = [];
  mesero: Mesero = new Mesero();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _seccionService: SeccionService,
    public _meseroService: MeseroService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarMesero(id);
      }
    });
  }

  ngOnInit() {
    this._seccionService
      .cargarSecciones()
      .subscribe((resp:any) => (this.secciones = resp.secciones));
  }

  cargarMesero(id: string) {
    this._meseroService.cargarMesero(id).subscribe(mesero => {
      console.log(mesero);

      this.mesero = mesero;
      // this.mesero.seccion = mesero.seccion._id;
      // this.seccion = mesero.seccion._id;
      // this.cambioSeccion(this.mesero.seccion);
    });
  }

  guardarMesero(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.mesero.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      this._meseroService.crearMesero(this.mesero).subscribe(mesero => {
        this.mesero = mesero;
        this.router.navigate(["/mesero", this.mesero._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Mesero');
      this._meseroService.actualizarMesero(this.mesero).subscribe(mesero => {
        this.router.navigate(["/mesero", this.idparam]);
      });
    }
  }

  cambioSeccion(id: string) {
    this._seccionService.obtenerSeccion(id).subscribe(seccion => {
      this.seccion = seccion;
      // if (this.seccion) {
      //   console.log(this.seccion.img);
      // }
    });
  }

  cambiarFoto(id: string) {
    this._modalUploadService.mostrarModal("meseros", id);

    this._modalUploadService.notificacion.subscribe(resp => {
      console.log(resp);
      this.mesero.img = resp.data.img;
    });
  }
}
