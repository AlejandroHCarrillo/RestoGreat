import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AreaVenta } from "src/app/models/areaventa.model";
import {
  SeccionService,
  AreaventaService,
  UsuarioService
} from "src/app/services/service.index";
import { Seccion } from "./../../../models/seccion.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-areaventa",
  templateUrl: "./areaventa.component.html",
  styles: []
})
export class AreaventaComponent implements OnInit {
  seccion: Seccion = new Seccion("", new Date());
  secciones: Seccion[] = [];
  areaventa: AreaVenta = new AreaVenta();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _seccionService: SeccionService,
    public _areaventaService: AreaventaService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarAreaventa(id);
      }
    });
  }

  ngOnInit() {
    this._seccionService
      .cargarSecciones()
      .subscribe((resp:any) => (this.secciones = resp.secciones));
  }

  cargarAreaventa(id: string) {
    this._areaventaService.cargarAreaventa(id).subscribe(areaventa => {
      console.log(areaventa);

      this.areaventa = areaventa;

    });
  }

  guardarAreaventa(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.areaventa.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Areaventa');
      this._areaventaService.crearAreaventa(this.areaventa).subscribe(areaventa => {
        this.areaventa = areaventa;
        this.router.navigate(["/areaventa", this.areaventa._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Areaventa');
      this._areaventaService.actualizarAreaventa(this.areaventa).subscribe(areaventa => {
        this.router.navigate(["/areaventa", this.idparam]);
      });
    }
  }



}
