import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { SeccionService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Seccion } from "src/app/models/seccion.model";
import Swal from 'sweetalert2'

@Component({
  selector: "app-secciones",
  templateUrl: "./secciones.component.html",
  styleUrls: []
})
export class SeccionesComponent implements OnInit {
  secciones: Seccion[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _seccionService: SeccionService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarSecciones();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarSecciones();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("secciones", id);
  }

  cargarSecciones() {
    this.cargando = true;
    this._seccionService
      .cargarSecciones(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.secciones = resp.secciones;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarSecciones();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarSecciones();
    }
  }

  buscarSeccion(termino: string) {
    if (termino.length <= 0) {
      this.cargarSecciones();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._seccionService
      .buscarSecciones(termino)
      .subscribe((secciones: Seccion[]) => {
        // console.log(secciones);
        this.totalRegistros = secciones.length;
        this.secciones = secciones;
      });
    this.cargando = false;
  }

  borrarSeccion(id: string) {
    // console.log(id);
    // confirm()

    Swal.fire({
      title: "¿Estas seguro de eliminar a este seccion?",
      text: "Una vez eliminado no es posible recuperar al seccion",
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
        this._seccionService.borrarSeccion(id).subscribe(resp => {
          this.cargarSecciones();
        });
      } else {
        // console.log('NO BORRADO');
        Swal.fire( "El seccion no fue eliminado", "El seccion no ha sido eliminado" );
      }
    });

  }

  crearSeccion() {

    Swal.fire({
      title: 'Alta de nuevo seccion',
      text: 'Por favor escriba el nombre del seccion:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del seccion'
        }
      }
    }).then( (value) => {
      console.log(value);
      this._seccionService.crearSeccion(value.value)
                           .subscribe(resp => { 
                             console.log(resp);
                             Swal.fire('Se ha creado el seccion:', resp.nombre, 'success' );
                            });
    });
  }

  guardarSeccion(seccion: Seccion) {
    this._seccionService.actualizarSeccion(seccion).subscribe(resp => {
      console.log(resp);
    });
  }
}
