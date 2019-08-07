import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { TurnoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Turno } from "src/app/models/turno.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styles: []
})
export class TurnosComponent implements OnInit {
  turnos: Turno[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _turnoService: TurnoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarTurnos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarTurnos();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("turnos", id);
  }

  cargarTurnos() {
    this.cargando = true;
    this._turnoService
      .cargarTurnos(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.turnos = resp.turnos;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarTurnos();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarTurnos();
    }
  }

  buscarTurno(termino: string) {
    if (termino.length <= 0) {
      this.cargarTurnos();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._turnoService
      .buscarTurnos(termino)
      .subscribe((turnos: Turno[]) => {
        // console.log(turnos);
        this.totalRegistros = turnos.length;
        this.turnos = turnos;
      });
    this.cargando = false;
  }

  borrarTurno(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este turno?",
      text: "Una vez eliminado no es posible recuperar al turno",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._turnoService.borrarTurno(id).subscribe(resp => {
          // console.log(resp);
          this.cargarTurnos();
        });
      } else {
        Swal.fire( "El turno no fue eliminado", "El turno no ha sido eliminado" );
        // alert("El turno no fue eliminado");
      }
    });
  }

  // crearTurno(nombre: string) {
  //   Swal.fire({
  //     title: 'Alta de nuevo turno',
  //     text: 'Por favor escriba el nombre del turno:',
  //     input: 'text',
  //     // inputValue: inputValue,
  //     showCancelButton: true,
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'Por favor escriba el nombre del turno'
  //       }
  //     }
  //   }).then(value => {
  //     let turno = new Turno( value.value,  new Date(), "");

  //     turno.clave = value.value;  
  //     turno.fechaActualizacion = new Date();
  //     turno.usuario =  this._usuarioService.usuario._id;

  //     this._turnoService.crearTurno(turno)
  //                       .subscribe(resp => {
  //                         console.log(resp);
  //                         this.cargarTurnos();
  //                         Swal.fire('Se ha creado al turno:', resp.nombre, 'success' );
  //                     });
  //   });
  // }

  // guardarTurno(turno: Turno) {
  //   turno.usuario =  this._usuarioService.usuario._id;
  //   this._turnoService.actualizarTurno(turno).subscribe(resp => {
  //     console.log(resp);
  //   });
  // }
}
