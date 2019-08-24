import { Router, ActivatedRoute } from "@angular/router";
import { Cuenta } from "src/app/models/cuenta.model";
import {
  MeseroService,
  CuentaService,
  UsuarioService
} from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Mesero } from "src/app/models/mesero.model";

@Component({
  selector: "app-cuenta",
  templateUrl: "./cuenta.component.html",
  styles: []
})
export class CuentaComponent implements OnInit {
  cuenta: Cuenta = new Cuenta();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _cuentaService: CuentaService,
    public _meseroService: MeseroService,
    public _usuarioService: UsuarioService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      
      // Obtener el mesero automaticamente
//      this.cuenta.mesero = _usuarioService.usuario;

      if (id !== "nuevo") {
        this.cargarCuenta(id);
      } else{
        // console.log("Usuario Id:", _usuarioService.usuario._id );
        this.cuenta = new Cuenta();
        this.cuenta.fecha = new Date(Date.now());
        this.cuenta.numeromesa = 1;
        this.cuenta.numerocomensales = 1;
        this.cuenta.estatus = 1;

        this.cuenta.mesero = new Mesero();
        _meseroService.cargarMeseroPorUsuarioId(_usuarioService.usuario._id).subscribe((meseroResp:Mesero) => {
          this.cuenta.mesero = meseroResp;
          // console.log('Mesero Asignado: ', meseroResp);
        })

        // this.cuenta.mesero.nombre = _usuarioService.usuario.nombre;
        // this.cuenta.mesero.apaterno = _usuarioService.usuario.;
        // this.cuenta.mesero.apaterno = _usuarioService.usuario.nombre;
      }
    });
  }

  ngOnInit() {
  }

  cargarCuenta(id: string) {
    this._cuentaService.cargarCuenta(id).subscribe(cuenta => {
      // console.log(cuenta);
      this.cuenta = cuenta;
    });
  }

  guardarCuenta(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.cuenta.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Cuenta');
      this._cuentaService.crearCuenta(this.cuenta).subscribe(cuenta => {
        this.cuenta = cuenta;
        this.router.navigate(["/cuenta", this.cuenta._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Cuenta');
      this._cuentaService.actualizarCuenta(this.cuenta).subscribe(cuenta => {
        this.router.navigate(["/cuenta", this.idparam]);
      });
    }
  }

}
