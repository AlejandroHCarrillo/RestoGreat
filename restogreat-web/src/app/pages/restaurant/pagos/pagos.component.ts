import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { PagoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Pago } from "src/app/models/pago.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styles: []
})
export class PagosComponent implements OnInit {
  pagos: Pago[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _pagoService: PagoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarPagos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarPagos();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("pagos", id);
  }

  cargarPagos() {
    this.cargando = true;
    this._pagoService
      .cargarPagos(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.pagos = resp.pagos;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarPagos();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarPagos();
    }
  }

  buscarPago(termino: string) {
    if (termino.length <= 0) {
      this.cargarPagos();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._pagoService
      .buscarPagos(termino)
      .subscribe((pagos: Pago[]) => {
        // console.log(pagos);
        this.totalRegistros = pagos.length;
        this.pagos = pagos;
      });
    this.cargando = false;
  }

  borrarPago(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar este pago?",
      text: "Una vez eliminado no es posible recuperar al pago",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._pagoService.borrarPago(id).subscribe(resp => {
          // console.log(resp);
          this.cargarPagos();
        });
      } else {
        Swal.fire( "El pago no fue eliminado", "El pago no ha sido eliminado" );
        // alert("El pago no fue eliminado");
      }
    });
  }

  crearPago(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo pago',
      text: 'Por favor escriba el nombre del pago:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del pago'
        }
      }
    }).then(value => {
      let pago = new Pago();

      // pago.clave = value.value;  
      
      // pago.cuenta = ; 
      // pago.formaPago = ; 
      pago.monto = value.value; 
      // pago.referencia = ; 
      // pago.observaciones = ; 
      
      pago.fechaActualizacion = new Date();
      pago.usuario =  this._usuarioService.usuario._id;

      this._pagoService.crearPago(pago)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarPagos();
                          Swal.fire('Se ha creado al pago:', resp.nombre, 'success' );
                      });
    });
  }

  guardarPago(pago: Pago) {
    pago.usuario =  this._usuarioService.usuario._id;
    this._pagoService.actualizarPago(pago).subscribe(resp => {
      console.log(resp);
    });
  }
}
