import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { CausacancelacionService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Causacancelacion } from "src/app/models/causacancelacion.model";
import Swal from 'sweetalert2'

@Component({
  selector: "app-causascancelacion",
  templateUrl: "./causascancelacion.component.html",
  styleUrls: []
})
export class CausascancelacionComponent implements OnInit {
  causascancelacion: Causacancelacion[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _causacancelacionService: CausacancelacionService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarCausascancelacion();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarCausascancelacion();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("causascancelacion", id);
  }

  cargarCausascancelacion() {
    this.cargando = true;
    this._causacancelacionService
      .cargarCausascancelacion(this.desde)
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.causascancelacion = resp.causascancelacion;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarCausascancelacion();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarCausascancelacion();
    }
  }

  buscarCausacancelacion(termino: string) {
    if (termino.length <= 0) {
      this.cargarCausascancelacion();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._causacancelacionService
      .buscarCausascancelacion(termino)
      .subscribe((causascancelacion: Causacancelacion[]) => {
        // console.log(causascancelacion);
        this.totalRegistros = causascancelacion.length;
        this.causascancelacion = causascancelacion;
      });
    this.cargando = false;
  }

  borrarCausacancelacion(id: string) {
    // console.log(id);
    // confirm()

    Swal.fire({
      title: "¿Estas seguro de eliminar a este causacancelacion?",
      text: "Una vez eliminado no es posible recuperar al causacancelacion",
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
        this._causacancelacionService.borrarCausacancelacion(id).subscribe(resp => {
          this.cargarCausascancelacion();
        });
      } else {
        // console.log('NO BORRADO');
        Swal.fire( "El causacancelacion no fue eliminado", "El causacancelacion no ha sido eliminado" );
      }
    });

  }

  crearCausacancelacion() {

    Swal.fire({
      title: 'Alta de nuevo causacancelacion',
      text: 'Por favor escriba el nombre del causacancelacion:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del causacancelacion'
        }
      }
    }).then( (value) => {
      console.log(value);
      this._causacancelacionService.crearCausacancelacion(value.value)
                           .subscribe(resp => { 
                             console.log(resp);
                             Swal.fire('Se ha creado el causacancelacion:', resp.nombre, 'success' );
                            });
    });
  }

  guardarCausacancelacion(causacancelacion: Causacancelacion) {
    this._causacancelacionService.actualizarCausacancelacion(causacancelacion).subscribe(resp => {
      console.log(resp);
    });
  }
}
