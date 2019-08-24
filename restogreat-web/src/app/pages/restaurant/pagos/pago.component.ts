import { Router, ActivatedRoute } from "@angular/router";
import { Pago } from "src/app/models/pago.model";
import { Cuenta } from 'src/app/models/cuenta.model';
import {
  FormaPagoService,
  PagoService,
  UsuarioService
} from "src/app/services/service.index";
import { FormaPago } from "./../../../models/formapago.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-pago",
  templateUrl: "./pago.component.html",
  styles: []
})
export class PagoComponent implements OnInit {
  formapago: FormaPago = new FormaPago();
  formaspago: FormaPago[] = [];
  pago: Pago = new Pago();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _formaPagoService: FormaPagoService,
    public _pagoService: PagoService,
    public _usuarioService: UsuarioService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarPago(id);
      } else {
        if (!this.pago.cuenta){
          this.pago.cuenta = new Cuenta();
          this.pago.cuenta._id = ""; 
        }
        if (!this.pago.formaPago){
          this.pago.formaPago = new FormaPago();
          this.pago.formaPago._id = ""; 
        }
      }
    });
  }

  ngOnInit() {
    this._formaPagoService
      .cargarFormaspago()
      .subscribe((resp:any) => (this.formaspago = resp.formaspago));
  }

  cargarPago(id: string) {
    this._pagoService.cargarPago(id).subscribe(pago => {
      console.log('cargarPago.formaPago: ', pago.formaPago);

      this.pago = pago;
      this.formapago = pago.formaPago;

      this.cambioFormaPago(this.pago.formaPago._id);
    });
  }

  guardarPago(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.pago.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Pago');
      this._pagoService.crearPago(this.pago).subscribe(pago => {
        this.pago = pago;
        this.router.navigate(["/pago", this.pago._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Pago');
      this._pagoService.actualizarPago(this.pago).subscribe(pago => {
        this.router.navigate(["/pago", this.idparam]);
      });
    }
  }

  cambioFormaPago(id: string) {
    this._formaPagoService.obtenerFormapago(id).subscribe(formaPago => {
      console.log('esto es lo que tra el a forma de pago: ', formaPago);
      
      this.pago.formaPago = formaPago;
      this.formapago = formaPago;
      // if (this.formaPago) {
      //   console.log(this.formaPago.img);
      // }
    });
  }


}
