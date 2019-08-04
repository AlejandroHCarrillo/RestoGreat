import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormaPago } from "src/app/models/formapago.model";
import {
  SeccionService,
  FormaPagoService,
  UsuarioService
} from "src/app/services/service.index";
import { Seccion } from "./../../../models/seccion.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-formapago",
  templateUrl: "./formapago.component.html",
  styles: []
})
export class FormapagoComponent implements OnInit {
  seccion: Seccion = new Seccion("", new Date());
  secciones: Seccion[] = [];
  formapago: FormaPago = new FormaPago();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _seccionService: SeccionService,
    public _formapagoService: FormaPagoService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarFormapago(id);
      }
    });
  }

  ngOnInit() {
    this._seccionService
      .cargarSecciones()
      .subscribe((resp:any) => (this.secciones = resp.secciones));
  }

  cargarFormapago(id: string) {
    this._formapagoService.cargarFormapago(id).subscribe(formapago => {
      console.log(formapago);

      this.formapago = formapago;

    });
  }

  guardarFormapago(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.formapago.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Formapago');
      this._formapagoService.crearFormapago(this.formapago).subscribe(formapago => {
        this.formapago = formapago;
        this.router.navigate(["/formapago", this.formapago._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Formapago');
      this._formapagoService.actualizarFormapago(this.formapago).subscribe(formapago => {
        this.router.navigate(["/formapago", this.idparam]);
      });
    }
  }



}
