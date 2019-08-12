import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { CuentaService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Cuenta } from "src/app/models/cuenta.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styles: []
})
export class CuentasComponent implements OnInit {
  cuentas: Cuenta[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _cuentaService: CuentaService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarCuentas();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarCuentas();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("cuentas", id);
  }

  cargarCuentas() {
    this.cargando = true;
    this._cuentaService
      .cargarCuentas(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.cuentas = resp.cuentas;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarCuentas();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarCuentas();
    }
  }

  buscarCuenta(termino: string) {
    if (termino.length <= 0) {
      this.cargarCuentas();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._cuentaService
      .buscarCuentas(termino)
      .subscribe((cuentas: Cuenta[]) => {
        // console.log(cuentas);
        this.totalRegistros = cuentas.length;
        this.cuentas = cuentas;
      });
    this.cargando = false;
  }

  borrarCuenta(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este cuenta?",
      text: "Una vez eliminado no es posible recuperar al cuenta",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._cuentaService.borrarCuenta(id).subscribe(resp => {
          // console.log(resp);
          this.cargarCuentas();
        });
      } else {
        Swal.fire( "El cuenta no fue eliminado", "El cuenta no ha sido eliminado" );
        // alert("El cuenta no fue eliminado");
      }
    });
  }

  crearCuenta(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo cuenta',
      text: 'Por favor escriba el nombre del cuenta:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del cuenta'
        }
      }
    }).then(value => {
      let cuenta = new Cuenta();

      cuenta.fecha = value.value;  
      cuenta.fechaActualizacion = new Date();
      cuenta.usuario =  this._usuarioService.usuario._id;

      this._cuentaService.crearCuenta(cuenta)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarCuentas();
                          Swal.fire('Se ha creado al cuenta:', resp.nombre, 'success' );
                      });
    });
  }

  guardarCuenta(cuenta: Cuenta) {
    cuenta.usuario =  this._usuarioService.usuario._id;
    this._cuentaService.actualizarCuenta(cuenta).subscribe(resp => {
      console.log(resp);
    });
  }
}
