import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Modificador } from "src/app/models/modificador.model";
import {
  RubroService,
  ModificadorService,
  UsuarioService
} from "src/app/services/service.index";
import { Rubro } from "./../../../models/rubro.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-modificador",
  templateUrl: "./modificador.component.html",
  styles: []
})
export class ModificadorComponent implements OnInit {
  rubro: Rubro = new Rubro();
  rubros: Rubro[] = [];
  modificador: Modificador = new Modificador();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _rubroService: RubroService,
    public _modificadorService: ModificadorService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {

    this.modificador.rubro = new Rubro();
    
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarModificador(id);
      }
    });
  }

  ngOnInit() {
    this._rubroService
      .cargarRubros()
      .subscribe((resp:any) => (this.rubros = resp.rubros));
  }

  cargarModificador(id: string) {
    console.log(id);
    
    this._modificadorService.cargarModificador(id).subscribe(modificador => {
      console.log(modificador);

      this.modificador = modificador;
      this.modificador.rubro = modificador.rubro;

      this.rubro = modificador.rubro;

      this.cambioRubro(this.modificador.rubro._id);
    });
  }

  guardarModificador(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.modificador.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      console.log('Creando Modificador');
      
      this._modificadorService.crearModificador(this.modificador).subscribe(modificador => {
        console.log(modificador);
        this.modificador = modificador;
        this.router.navigate(["/modificador", this.modificador._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Modificador');
      this._modificadorService.actualizarModificador(this.modificador).subscribe(modificador => {
        this.router.navigate(["/modificador", this.idparam]);
      });
    }
  }

  cambioRubro(id: string) {
    console.log('cambioRubro id: ', id);
    
    this._rubroService.obtenerRubro(id).subscribe(rubro => {
      this.rubro = rubro;
      // if (this.rubro) {
      //   console.log(this.rubro.img);
      // }
    });
  }

}
