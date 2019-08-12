import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { BancoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Banco } from "src/app/models/banco.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styles: []
})
export class BancosComponent implements OnInit {
  bancos: Banco[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _bancoService: BancoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarBancos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarBancos();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("bancos", id);
  }

  cargarBancos() {
    this.cargando = true;
    this._bancoService
      .cargarBancos(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.bancos = resp.bancos;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarBancos();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarBancos();
    }
  }

  buscarBanco(termino: string) {
    if (termino.length <= 0) {
      this.cargarBancos();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._bancoService
      .buscarBancos(termino)
      .subscribe((bancos: Banco[]) => {
        // console.log(bancos);
        this.totalRegistros = bancos.length;
        this.bancos = bancos;
      });
    this.cargando = false;
  }

  borrarBanco(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este banco?",
      text: "Una vez eliminado no es posible recuperar al banco",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._bancoService.borrarBanco(id).subscribe(resp => {
          // console.log(resp);
          this.cargarBancos();
        });
      } else {
        Swal.fire( "El banco no fue eliminado", "El banco no ha sido eliminado" );
        // alert("El banco no fue eliminado");
      }
    });
  }

  crearBanco(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo banco',
      text: 'Por favor escriba el nombre del banco:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del banco'
        }
      }
    }).then(value => {
      let banco = new Banco( value.value,  new Date(), "");

      banco.clave = value.value;  
      banco.fechaActualizacion = new Date();
      banco.usuario =  this._usuarioService.usuario._id;

      this._bancoService.crearBanco(banco)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarBancos();
                          Swal.fire('Se ha creado al banco:', resp.nombre, 'success' );
                      });
    });
  }

  guardarBanco(banco: Banco) {
    banco.usuario =  this._usuarioService.usuario._id;
    this._bancoService.actualizarBanco(banco).subscribe(resp => {
      console.log(resp);
    });
  }
}
