import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { RubroService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Rubro } from "src/app/models/rubro.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styles: []
})
export class RubrosComponent implements OnInit {
  rubros: Rubro[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _rubroService: RubroService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarRubros();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarRubros();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("rubros", id);
  }

  cargarRubros() {
    this.cargando = true;
    this._rubroService
      .cargarRubros(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.rubros = resp.rubros;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarRubros();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarRubros();
    }
  }

  buscarRubro(termino: string) {
    if (termino.length <= 0) {
      this.cargarRubros();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._rubroService
      .buscarRubros(termino)
      .subscribe((rubros: Rubro[]) => {
        // console.log(rubros);
        this.totalRegistros = rubros.length;
        this.rubros = rubros;
      });
    this.cargando = false;
  }

  borrarRubro(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este rubro?",
      text: "Una vez eliminado no es posible recuperar al rubro",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._rubroService.borrarRubro(id).subscribe(resp => {
          // console.log(resp);
          this.cargarRubros();
        });
      } else {
        Swal.fire( "El rubro no fue eliminado", "El rubro no ha sido eliminado" );
        // alert("El rubro no fue eliminado");
      }
    });
  }

  guardarRubro(rubro: Rubro) {
    rubro.usuario =  this._usuarioService.usuario._id;
    this._rubroService.actualizarRubro(rubro).subscribe(resp => {
      console.log(resp);
    });
  }
}
