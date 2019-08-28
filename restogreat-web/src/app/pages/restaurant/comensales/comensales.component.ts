import { ActivatedRoute } from "@angular/router";
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { CuentaService, ComensalService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Comensal } from "src/app/models/comensal.model";
import { Cuenta } from "src/app/models/cuenta.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-comensales',
  templateUrl: './comensales.component.html',
  styles: []
})
export class ComensalesComponent implements OnInit {
  idCuenta: string;
  cuentaSeleccionada: Cuenta;
  comensales: Comensal[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _comensalService: ComensalService,
    public _cuentaService: CuentaService,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idCuenta = id;
      if (id !== "nuevo") {
        this.cargarComensales();
      }
    });
  }

  ngOnInit() {

    this._cuentaService.cargarCuenta(this.idCuenta).subscribe(resp=>{
      this.cuentaSeleccionada = resp;
    });

    this.cargarComensales();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarComensales();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("comensales", id);
  }

  cargarComensales() {
    this.cargando = true;
    this._comensalService
      .cargarComensales(this.idCuenta)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.comensales = resp.comensales;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarComensales();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarComensales();
    }
  }

  buscarComensal(termino: string) {
    if (termino.length <= 0) {
      this.cargarComensales();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._comensalService
      .buscarComensales(termino)
      .subscribe((comensales: Comensal[]) => {
        // console.log(comensales);
        this.totalRegistros = comensales.length;
        this.comensales = comensales;
      });
    this.cargando = false;
  }

  borrarComensal(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este comensal?",
      text: "Una vez eliminado no es posible recuperar al comensal",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._comensalService.borrarComensal(id).subscribe(resp => {
          // console.log(resp);
          this.cargarComensales();
        });
      } else {
        Swal.fire( "El comensal no fue eliminado", "El comensal no ha sido eliminado" );
        // alert("El comensal no fue eliminado");
      }
    });
  }

  crearComensal(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo comensal',
      text: 'Por favor escriba el nombre del comensal:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del comensal'
        }
      }
    }).then(value => {
      let comensal = new Comensal();

      comensal.numero = value.value;  

      comensal.fechaActualizacion = new Date();
      comensal.usuario =  this._usuarioService.usuario._id;

      this._comensalService.crearComensal(comensal)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarComensales();
                          Swal.fire('Se ha creado al comensal:', resp.nombre, 'success' );
                      });
    });
  }

  guardarComensal(comensal: Comensal) {
    comensal.usuario =  this._usuarioService.usuario._id;
    this._comensalService.actualizarComensal(comensal).subscribe(resp => {
      console.log(resp);
    });
  }
}
