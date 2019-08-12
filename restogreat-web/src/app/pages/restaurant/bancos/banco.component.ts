import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Banco } from "src/app/models/banco.model";
import {
  SeccionService,
  BancoService,
  UsuarioService
} from "src/app/services/service.index";
import { Seccion } from "./../../../models/seccion.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-banco",
  templateUrl: "./banco.component.html",
  styles: []
})
export class BancoComponent implements OnInit {
  banco: Banco = new Banco("", new Date(), "");
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _bancoService: BancoService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarBanco(id);
      }
    });
  }

  ngOnInit() {
  }

  cargarBanco(id: string) {
    this._bancoService.cargarBanco(id).subscribe(banco => {
      // console.log(banco);
      this.banco = banco;
    });
  }

  guardarBanco(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.banco.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Banco');
      this._bancoService.crearBanco(this.banco).subscribe(banco => {
        this.banco = banco;
        this.router.navigate(["/banco", this.banco._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Banco');
      this._bancoService.actualizarBanco(this.banco).subscribe(banco => {
        this.router.navigate(["/banco", this.idparam]);
      });
    }
  }
}
