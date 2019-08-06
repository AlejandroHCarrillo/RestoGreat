import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Rubro } from "src/app/models/rubro.model";
import {
  SeccionService,
  RubroService,
  UsuarioService
} from "src/app/services/service.index";
import { Seccion } from "./../../../models/seccion.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-rubro",
  templateUrl: "./rubro.component.html",
  styles: []
})
export class RubroComponent implements OnInit {
  seccion: Seccion = new Seccion("", new Date());
  secciones: Seccion[] = [];
  rubro: Rubro = new Rubro();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _seccionService: SeccionService,
    public _rubroService: RubroService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {

    this.rubro.seccion = new Seccion("", new Date());

    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarRubro(id);
      }
    });
  }

  ngOnInit() {
    this._seccionService
      .cargarSecciones()
      .subscribe((resp:any) => (this.secciones = resp.secciones));
  }

  cargarRubro(id: string) {
    this._rubroService.cargarRubro(id).subscribe(rubro => {
      console.log(rubro);

      this.rubro = rubro;
      this.rubro.seccion = rubro.seccion;

      this.seccion = rubro.seccion;

      this.cambioSeccion(this.rubro.seccion._id);
    });
  }

  guardarRubro(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.rubro.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Rubro');
      this._rubroService.crearRubro(this.rubro).subscribe(rubro => {
        this.rubro = rubro;
        this.router.navigate(["/rubro", this.rubro._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Rubro');
      this._rubroService.actualizarRubro(this.rubro).subscribe(rubro => {
        this.router.navigate(["/rubro", this.idparam]);
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

}
