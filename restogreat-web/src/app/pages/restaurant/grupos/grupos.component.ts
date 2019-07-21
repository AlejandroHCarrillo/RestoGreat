import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { GrupoService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Grupo } from "src/app/models/grupo.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {
  grupos: Grupo[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _grupoService: GrupoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarGrupos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarGrupos();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("grupos", id);
  }

  cargarGrupos() {
    this.cargando = true;
    this._grupoService
      .cargarGrupos(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.grupos = resp.grupos;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarGrupos();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarGrupos();
    }
  }

  buscarGrupo(termino: string) {
    if (termino.length <= 0) {
      this.cargarGrupos();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._grupoService
      .buscarGrupos(termino)
      .subscribe((grupos: Grupo[]) => {
        // console.log(grupos);
        this.totalRegistros = grupos.length;
        this.grupos = grupos;
      });
    this.cargando = false;
  }

  borrarGrupo(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este grupo?",
      text: "Una vez eliminado no es posible recuperar al grupo",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._grupoService.borrarGrupo(id).subscribe(resp => {
          // console.log(resp);
          this.cargarGrupos();
        });
      } else {
        Swal.fire( "El grupo no fue eliminado", "El grupo no ha sido eliminado" );
        // alert("El grupo no fue eliminado");
      }
    });
  }

  crearGrupo(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo grupo',
      text: 'Por favor escriba el nombre del grupo:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del seccion'
        }
      }
    }).then(value => {
      let grupo = new Grupo( value.value,  new Date(), "");

      grupo.abreviacion = value.value;  
      grupo.fechaActualizacion = new Date();
      grupo.usuario =  this._usuarioService.usuario._id;

      this._grupoService.crearGrupo(grupo)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarGrupos();
                          Swal.fire('Se ha creado al grupo:', resp.nombre, 'success' );
                      });
    });
  }

  guardarGrupo(grupo: Grupo) {
    grupo.usuario =  this._usuarioService.usuario._id;
    this._grupoService.actualizarGrupo(grupo).subscribe(resp => {
      console.log(resp);
    });
  }
}
