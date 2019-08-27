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
  cargando : boolean;

  cuenta: Cuenta = new Cuenta();
  idparam: string;

  showDatePicker: boolean = false;

  mesero: Mesero;
  meseros: Mesero[] = [];

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

      if (id !== "nuevo") {
        this.cargarCuenta(id);
      } else {
        this.cuenta = new Cuenta();
        this.cuenta.fecha = new Date(Date.now());

        this.cuenta.numeromesa = 1;
        this.cuenta.numerocomensales = 1;
        this.cuenta.estatus = 1;

        this.asignarMeseroActual();
      }
    });
  }

  ngOnInit() {
    this.cargarMeseros();
  }

  cargarCuenta(id: string) {
    this._cuentaService.cargarCuenta(id).subscribe(cuenta => {      
      if(!cuenta.mesero){
        console.log("No tiene mesero asignado");
        this.asignarMeseroActual();
      }      
      this.mesero = cuenta.mesero;
      this.cuenta = cuenta;
    });
  }

  asignarMeseroActual(){
  this._meseroService.cargarMeseroPorUsuarioId(this._usuarioService.usuario._id)
    .subscribe((meseroResp: Mesero) => {
      this.mesero = meseroResp;
      this.cuenta.mesero = meseroResp;
      console.log("Mesero Asignado: ", meseroResp);
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
        this.router.navigate(["/cuenta", this.cuenta._id]).catch(err => {
          console.log(err);
        });
      });
    } else {
      // console.log('Actualizando Cuenta');
      this._cuentaService.actualizarCuenta(this.cuenta).subscribe(cuenta => {
        this.router.navigate(["/cuenta", this.idparam]);
      });
    }
  }

  toggleDatePicker(e){
    e.preventDefault();
    this.showDatePicker = !this.showDatePicker;
  }

  cargarMeseros() {
    this._meseroService
      .cargarListaMeseros("")
      .subscribe((resp: any) => {
        this.meseros = resp.meseros;
      });
  }

  cambioMesero(id: string) {
    this._meseroService.obtenerMesero(id).subscribe(mesero => {

        this.mesero = mesero;
        this.cuenta.mesero = mesero;
      });
  }

}
