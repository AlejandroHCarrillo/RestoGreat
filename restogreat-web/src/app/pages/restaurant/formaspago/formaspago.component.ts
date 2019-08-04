import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { FormaPagoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { FormaPago } from "src/app/models/formapago.model";
import Swal from 'sweetalert2'

@Component({
  selector: "app-formaspago",
  templateUrl: "./formaspago.component.html",
  styleUrls: []
})
export class FormaspagoComponent implements OnInit {
  formaspago: FormaPago[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _formapagoService: FormaPagoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarFormaspago();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarFormaspago();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("formaspago", id);
  }

  cargarFormaspago() {
    this.cargando = true;
    this._formapagoService
      .cargarFormaspago(this.desde)
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.formaspago = resp.formaspago;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarFormaspago();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarFormaspago();
    }
  }

  buscarFormapago(termino: string) {
    if (termino.length <= 0) {
      this.cargarFormaspago();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._formapagoService
      .buscarFormaspago(termino)
      .subscribe((formaspago: FormaPago[]) => {
        // console.log(formaspago);
        this.totalRegistros = formaspago.length;
        this.formaspago = formaspago;
      });
    this.cargando = false;
  }

  borrarFormapago(id: string) {
    // console.log(id);
    // confirm()

    Swal.fire({
      title: "¿Estas seguro de eliminar a este formapago?",
      text: "Una vez eliminado no es posible recuperar al formapago",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })
    .then((willDelete) => {
      // console.log(willDelete);      
      if (willDelete.value) {
        // console.log('Ya lo borro');        
        this._formapagoService.borrarFormapago(id).subscribe(resp => {
          this.cargarFormaspago();
        });
      } else {
        // console.log('NO BORRADO');
        Swal.fire( "El formapago no fue eliminado", "El formapago no ha sido eliminado" );
      }
    });

  }

    crearFormapago(nombre: string) {
      Swal.fire({
        title: 'Alta de nueva forma de pago',
        text: 'Por favor escriba el nombre del formapago:',
        input: 'text',
        // inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor escriba el nombre del formapago'
          }
        }
      }).then(value => {
        let formapago = new FormaPago();
  
        formapago.clave = value.value;  
        formapago.fechaActualizacion = new Date();
        formapago.usuario =  this._usuarioService.usuario._id;
  
        this._formapagoService.crearFormapago(formapago)
                          .subscribe(resp => {
                            console.log(resp);
                            this.cargarFormaspago();
                            Swal.fire('Se ha creado al formapago:', resp.nombre, 'success' );
                        });
      });
    }

  guardarFormapago(formapago: FormaPago) {
    this._formapagoService.actualizarFormapago(formapago).subscribe(resp => {
      console.log(resp);
    });
  }
}
