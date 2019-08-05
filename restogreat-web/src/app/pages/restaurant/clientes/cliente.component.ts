import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Cliente } from "src/app/models/cliente.model";
import {
  SeccionService,
  ClienteService,
  UsuarioService
} from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styles: []
})
export class ClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarCliente(id);
      }
    });
  }

  ngOnInit() {
  }

  cargarCliente(id: string) {
    this._clienteService.cargarCliente(id).subscribe(cliente => {
      console.log(cliente);

      this.cliente = cliente;

    });
  }

  guardarCliente(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.cliente.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Cliente');
      this._clienteService.crearCliente(this.cliente).subscribe(cliente => {
        this.cliente = cliente;
        this.router.navigate(["/cliente", this.cliente._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Cliente');
      this._clienteService.actualizarCliente(this.cliente).subscribe(cliente => {
        this.router.navigate(["/cliente", this.idparam]);
      });
    }
  }

  // cambiarFoto(id: string) {
  //   this._modalUploadService.mostrarModal("clientes", id);

  //   this._modalUploadService.notificacion.subscribe(resp => {
  //     console.log(resp);
  //     this.cliente.img = resp.data.img;
  //   });
  // }

}
