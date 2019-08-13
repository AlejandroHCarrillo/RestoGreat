import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Conceptodescuento } from "src/app/models/conceptodescuento.model";
import {
  SeccionService,
  ConceptodescuentoService,
  UsuarioService
} from "src/app/services/service.index";
import { Seccion } from "./../../../models/seccion.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-conceptodescuento",
  templateUrl: "./conceptodescuento.component.html",
  styles: []
})
export class ConceptodescuentoComponent implements OnInit {
  conceptodescuento: Conceptodescuento = new Conceptodescuento("", new Date(), "");
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _conceptodescuentoService: ConceptodescuentoService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarConceptodescuento(id);
      }
    });
  }

  ngOnInit() {
  }

  cargarConceptodescuento(id: string) {
    this._conceptodescuentoService.cargarConceptodescuento(id).subscribe(conceptodescuento => {
      // console.log(conceptodescuento);
      this.conceptodescuento = conceptodescuento;
    });
  }

  guardarConceptodescuento(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.conceptodescuento.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Conceptodescuento');
      this._conceptodescuentoService.crearConceptodescuento(this.conceptodescuento).subscribe(conceptodescuento => {
        this.conceptodescuento = conceptodescuento;
        this.router.navigate(["/conceptodescuento", this.conceptodescuento._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Conceptodescuento');
      this._conceptodescuentoService.actualizarConceptodescuento(this.conceptodescuento).subscribe(conceptodescuento => {
        this.router.navigate(["/conceptodescuento", this.idparam]);
      });
    }
  }
}
