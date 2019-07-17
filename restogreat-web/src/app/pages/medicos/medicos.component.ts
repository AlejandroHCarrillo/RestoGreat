import { UsuarioService } from './../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../components/modal-upload/modal-upload.service";
import { MedicoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Medico } from "src/app/models/medico.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarMedicos();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("medicos", id);
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService
      .cargarMedicos(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarMedicos();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarMedicos();
    }
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._medicoService
      .buscarMedicos(termino)
      .subscribe((medicos: Medico[]) => {
        // console.log(medicos);
        this.totalRegistros = medicos.length;
        this.medicos = medicos;
      });
    this.cargando = false;
  }

  borrarMedico(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este medico?",
      text: "Una vez eliminado no es posible recuperar al medico",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._medicoService.borrarMedico(id).subscribe(resp => {
          // console.log(resp);
          this.cargarMedicos();
        });
      } else {
        Swal.fire( "El medico no fue eliminado", "El medico no ha sido eliminado" );
        // alert("El medico no fue eliminado");
      }
    });
  }

  crearMedico(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo medico',
      text: 'Por favor escriba el nombre del medico:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del hospital'
        }
      }
    }).then(value => {
      let medico = new Medico();
      medico.nombre = value.value;
      medico.hospital = "";
      medico.usuario =  this._usuarioService.usuario._id;

      this._medicoService.crearMedico(medico)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarMedicos();
                          Swal.fire('Se ha creado al medico:', resp.nombre, 'success' );
                      });
    });
  }

  guardarMedico(medico: Medico) {
    medico.usuario =  this._usuarioService.usuario._id;
    this._medicoService.actualizarMedico(medico).subscribe(resp => {
      console.log(resp);
    });
  }
}
