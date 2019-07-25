import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { ColacomandaService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { ColaComanda } from "src/app/models/colacomanda.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-colascomanda',
  templateUrl: './colascomanda.component.html',
  styles: []
})
export class ColascomandaComponent implements OnInit {
  colascomanda: ColaComanda[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _colacomandaService: ColacomandaService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarColascomanda();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarColascomanda();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("colascomanda", id);
  }

  cargarColascomanda() {
    this.cargando = true;
    this._colacomandaService
      .cargarColascomanda(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.colascomanda = resp.colascomandas;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarColascomanda();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarColascomanda();
    }
  }

  buscarColacomanda(termino: string) {
    if (termino.length <= 0) {
      this.cargarColascomanda();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._colacomandaService
      .buscarColascomanda(termino)
      .subscribe((colascomanda: ColaComanda[]) => {
        // console.log(colascomanda);
        this.totalRegistros = colascomanda.length;
        this.colascomanda = colascomanda;
      });
    this.cargando = false;
  }

  borrarColacomanda(id: string) {
    // console.log(id);
    // confirm()

    Swal.fire({
      title: "¿Estas seguro de eliminar a este colacomanda?",
      text: "Una vez eliminado no es posible recuperar al colacomanda",
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
        this._colacomandaService.borrarColacomanda(id).subscribe(resp => {
          this.cargarColascomanda();
        });
      } else {
        // console.log('NO BORRADO');
        Swal.fire( "El colacomanda no fue eliminado", "El colacomanda no ha sido eliminado" );
      }
    });

  }

  crearColacomanda() {

    Swal.fire({
      title: 'Alta de nuevo colacomanda',
      text: 'Por favor escriba el nombre del colacomanda:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del colacomanda'
        }
      }
    }).then( (value) => {
      // console.log(value);
      this._colacomandaService.crearColacomanda(value.value)
                           .subscribe(resp => { 
                             console.log(resp);
                             Swal.fire('Se ha creado el colacomanda:', resp.nombre, 'success' );
                            });
    });
  }

  guardarColacomanda(colacomanda: ColaComanda) {
    this._colacomandaService.actualizarColacomanda(colacomanda).subscribe(resp => {
      console.log(resp);
    });
  }
}
