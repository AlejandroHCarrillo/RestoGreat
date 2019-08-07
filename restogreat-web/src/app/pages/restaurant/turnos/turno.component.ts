import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Turno } from "src/app/models/turno.model";
import {
  TurnoService,
  UsuarioService
} from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-turno",
  templateUrl: "./turno.component.html",
  styles: []
})
export class TurnoComponent implements OnInit {
  turno: Turno = new Turno();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _turnoService: TurnoService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarTurno(id);
      }
    });
  }

  ngOnInit() {
    this.turno.cajero = this._usuarioService.usuario.nombre;
  }

  cargarTurno(id: string) {
    this._turnoService.obtenerTurno(id).subscribe(turno => {
      console.log(turno);

      this.turno = turno;
    });
  }

  guardarTurno(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.turno.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Turno');
      this._turnoService.crearTurno(this.turno).subscribe(turno => {
        this.turno = turno;
        this.router.navigate(["/turno", this.turno._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Turno');
      this._turnoService.actualizarTurno(this.turno).subscribe(turno => {
        this.router.navigate(["/turno", this.idparam]);
      });
    }
  }

}
