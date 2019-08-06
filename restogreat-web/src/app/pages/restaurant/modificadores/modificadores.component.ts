import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { ModificadorService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Modificador } from "src/app/models/modificador.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modificadores',
  templateUrl: './modificadores.component.html',
  styles: []
})
export class ModificadoresComponent implements OnInit {
  modificadores: Modificador[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _modificadorService: ModificadorService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarModificadores();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarModificadores();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("modificadores", id);
  }

  cargarModificadores() {
    this.cargando = true;
    this._modificadorService
      .cargarModificadores(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.modificadores = resp.modificadores;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarModificadores();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarModificadores();
    }
  }

  buscarModificador(termino: string) {
    if (termino.length <= 0) {
      this.cargarModificadores();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._modificadorService
      .buscarModificadores(termino)
      .subscribe((modificadores: Modificador[]) => {
        // console.log(modificadores);
        this.totalRegistros = modificadores.length;
        this.modificadores = modificadores;
      });
    this.cargando = false;
  }

  borrarModificador(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este modificador?",
      text: "Una vez eliminado no es posible recuperar al modificador",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._modificadorService.borrarModificador(id).subscribe(resp => {
          // console.log(resp);
          this.cargarModificadores();
        });
      } else {
        Swal.fire( "El modificador no fue eliminado", "El modificador no ha sido eliminado" );
        // alert("El modificador no fue eliminado");
      }
    });
  }

  guardarModificador(modificador: Modificador) {
    modificador.usuario =  this._usuarioService.usuario._id;
    this._modificadorService.actualizarModificador(modificador).subscribe(resp => {
      console.log(resp);
    });
  }
}
