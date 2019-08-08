import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Grupo } from "src/app/models/grupo.model";
import {
  SeccionService,
  GrupoService,
  UsuarioService
} from "src/app/services/service.index";
import { Seccion } from "./../../../models/seccion.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-grupo",
  templateUrl: "./grupo.component.html",
  styles: []
})
export class GrupoComponent implements OnInit {
  seccion: Seccion = new Seccion("", new Date());
  secciones: Seccion[] = [];
  grupo: Grupo = new Grupo("", new Date(), "");
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _seccionService: SeccionService,
    public _grupoService: GrupoService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarGrupo(id);
      }
    });
  }

  ngOnInit() {
    this._seccionService
      .cargarSecciones()
      .subscribe((resp:any) => (this.secciones = resp.secciones));
  }

  cargarGrupo(id: string) {
    this._grupoService.cargarGrupo(id).subscribe(grupo => {
      // console.log(grupo);

      this.grupo = grupo;
      this.grupo.seccion = grupo.seccion._id;

      this.seccion = grupo.seccion._id;

      this.cambioSeccion(this.grupo.seccion);
    });
  }

  guardarGrupo(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.grupo.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Grupo');
      this._grupoService.crearGrupo(this.grupo).subscribe(grupo => {
        this.grupo = grupo;
        this.router.navigate(["/grupo", this.grupo._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Grupo');
      this._grupoService.actualizarGrupo(this.grupo).subscribe(grupo => {
        this.router.navigate(["/grupo", this.idparam]);
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
    this._modalUploadService.mostrarModal("grupos", id);

    this._modalUploadService.notificacion.subscribe(resp => {
      console.log(resp);
      this.grupo.img = resp.data.img;
    });
  }
}
