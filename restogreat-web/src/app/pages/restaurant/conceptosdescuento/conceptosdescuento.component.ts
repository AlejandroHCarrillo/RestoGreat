import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { ConceptodescuentoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Conceptodescuento } from "src/app/models/conceptodescuento.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-conceptosdescuento',
  templateUrl: './conceptosdescuento.component.html',
  styles: []
})
export class ConceptosdescuentoComponent implements OnInit {
  conceptosdescuento: Conceptodescuento[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _conceptodescuentoService: ConceptodescuentoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarConceptosdescuento();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarConceptosdescuento();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("conceptosdescuento", id);
  }

  cargarConceptosdescuento() {
    this.cargando = true;
    this._conceptodescuentoService
      .cargarConceptosdescuento(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.conceptosdescuento = resp.conceptosdescuento;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarConceptosdescuento();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarConceptosdescuento();
    }
  }

  buscarConceptodescuento(termino: string) {
    if (termino.length <= 0) {
      this.cargarConceptosdescuento();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._conceptodescuentoService
      .buscarConceptosdescuento(termino)
      .subscribe((conceptosdescuento: Conceptodescuento[]) => {
        // console.log(conceptosdescuento);
        this.totalRegistros = conceptosdescuento.length;
        this.conceptosdescuento = conceptosdescuento;
      });
    this.cargando = false;
  }

  borrarConceptodescuento(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este conceptodescuento?",
      text: "Una vez eliminado no es posible recuperar al conceptodescuento",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._conceptodescuentoService.borrarConceptodescuento(id).subscribe(resp => {
          // console.log(resp);
          this.cargarConceptosdescuento();
        });
      } else {
        Swal.fire( "El conceptodescuento no fue eliminado", "El conceptodescuento no ha sido eliminado" );
        // alert("El conceptodescuento no fue eliminado");
      }
    });
  }

  crearConceptodescuento(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo conceptodescuento',
      text: 'Por favor escriba el nombre del conceptodescuento:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del conceptodescuento'
        }
      }
    }).then(value => {
      let conceptodescuento = new Conceptodescuento( value.value,  new Date(), "");

      conceptodescuento.clave = value.value;  
      conceptodescuento.fechaActualizacion = new Date();
      conceptodescuento.usuario =  this._usuarioService.usuario._id;

      this._conceptodescuentoService.crearConceptodescuento(conceptodescuento)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarConceptosdescuento();
                          Swal.fire('Se ha creado al conceptodescuento:', resp.nombre, 'success' );
                      });
    });
  }

  guardarConceptodescuento(conceptodescuento: Conceptodescuento) {
    conceptodescuento.usuario =  this._usuarioService.usuario._id;
    this._conceptodescuentoService.actualizarConceptodescuento(conceptodescuento).subscribe(resp => {
      console.log(resp);
    });
  }
}
