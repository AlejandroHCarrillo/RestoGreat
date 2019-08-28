import { Producto } from 'src/app/models/producto.model';
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
import { Comensal } from "src/app/models/comensal.model";
import { Platillo } from "src/app/models/platillo.model";

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

  comensales: Comensal[] = [];

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
      
      this.cargarComensales();
    });
  }

  cargarComensales(){
    console.log("Cargando comensales:", this.cuenta.numerocomensales);
    for (let i = 0; i < this.cuenta.numerocomensales ; i++) {
      let element = new Comensal();
      element.platillos = new Array<Platillo>();

      let platillo = new Platillo();
      let sopa = new Producto();
      sopa.nombre = "Sopa " + i;
      platillo.producto = sopa;
      platillo.modificadores = "c/oregano, s/chile";
      platillo.estatus = 1;
      element.platillos.push(platillo);
      
      let platillo2 = new Platillo();      
      let platofuerte = new Producto();
      platofuerte.nombre = "Plato fuerte " + i;
      platillo2.producto = platofuerte;
      platillo2.modificadores = "Parrilla, T1/2, c/pimienta";
      platillo2.estatus = 2;
      element.platillos.push(platillo2);
      
      let platillo3 = new Platillo();      
      let bebida = new Producto();
      bebida.nombre = "bebida " + i;
      platillo3.producto = bebida;
      platillo3.modificadores = "S/Naranja";
      platillo3.estatus = 3;
      element.platillos.push(platillo3);
      
      let platillo4 = new Platillo();
      let postre = new Producto();
      postre.nombre = "postre " + i;
      platillo4.producto = postre;
      platillo4.modificadores = "S/fresa";
      platillo4.estatus = i;
      element.platillos.push(platillo4);
      
      this.comensales.push(element);
    }
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
