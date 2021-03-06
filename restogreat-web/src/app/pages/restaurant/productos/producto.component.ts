import { Grupo } from 'src/app/models/grupo.model';
import { ColacomandaService } from './../../../services/restaurant/colacomanda.service';
import { ColaComanda } from './../../../models/colacomanda.model';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Producto } from "src/app/models/producto.model";
import {
  GrupoService,
  ProductoService,
  UsuarioService
} from "src/app/services/service.index";

import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { log } from "util";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styles: []
})
export class ProductoComponent implements OnInit {
  grupo: Grupo = new Grupo("", new Date(), null);
  grupos: Grupo[] = [];
  colaComandas: ColaComanda = new ColaComanda("", new Date(), "", null, new Date, "");
  colasComandas: ColaComanda[] = [];

  producto: Producto = new Producto();
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _grupoService: GrupoService,
    public _colaComandaService: ColacomandaService,
    public _productoService: ProductoService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarProducto(id);
      }
    });
  }

  ngOnInit() {
    this.producto.grupo = new Grupo("", new Date(), null);
    this.producto.colaComandas = new ColaComanda("", new Date())


    this._grupoService
      .cargarGrupos()
      .subscribe((resp:any) => (this.grupos = resp.grupos));

      this._colaComandaService
      .cargarColascomanda()
      .subscribe((resp:any) => (this.colasComandas = resp.colascomandas));

  }

  cargarProducto(id: string) {
    this._productoService.cargarProducto(id).subscribe(producto => {
      this.producto = producto;
      this.producto.grupo._id = producto.grupo._id;
      this.grupo = producto.grupo;
      console.log("producto.grupo: ", producto.grupo );
      console.log("grupo._id: ", this.grupo._id );
      
      this.cambioGrupo(this.grupo._id);
    });
  }

  guardarProducto(f: NgForm) {
    console.log(f);
    
    if (f.invalid) {
      return;
    }

    console.log(this._usuarioService.usuario);
    
    // seteamos el usuario actual que hace la modificacion
    this.producto.usuario = this._usuarioService.usuario;
    this.producto.grupo = this.grupo;

    if (this.idparam === "nuevo") {
      console.log('Creando Producto');
      console.log(this.producto);

      this._productoService.crearProducto(this.producto).subscribe(producto => {
        this.producto = producto;
        this.router.navigate(["/producto", this.producto._id])
        .catch( err => {
            console.log(err);
        }

        );
      });
    } else {
      // console.log('Actualizando Producto');
      this._productoService.actualizarProducto(this.producto).subscribe(producto => {
        this.router.navigate(["/producto", this.idparam]);
      });
    }
  }

  cambioGrupo(id: string) {
    this._grupoService.obtenerGrupo(id).subscribe(grupo => {
      this.grupo = grupo;
    });
  }

  cambioColacomandas(id: string) {
    console.log("id", id);
    
    if(id===""){
      this.colaComandas = null;
      return;
    }

    this._colaComandaService.obtenerColacomanda(id).subscribe(colacomanda => {
      this.colaComandas = colacomanda;
    });
  }

  cambiarFoto(id: string) {
    this._modalUploadService.mostrarModal("productos", id);

    this._modalUploadService.notificacion.subscribe(resp => {
      console.log(resp);
      this.producto.img = resp.data.img;
    });
  }
}
