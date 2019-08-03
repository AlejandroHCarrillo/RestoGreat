import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { MeseroService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Mesero } from "src/app/models/mesero.model";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-meseros',
  templateUrl: './meseros.component.html',
  styles: []
})
export class MeserosComponent implements OnInit {
  meseros: Mesero[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _meseroService: MeseroService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarMeseros();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarMeseros();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("meseros", id);
  }

  cargarMeseros() {
    this.cargando = true;
    this._meseroService
      .cargarMeseros(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.meseros = resp.meseros;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarMeseros();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarMeseros();
    }
  }

  buscarMesero(termino: string) {
    if (termino.length <= 0) {
      this.cargarMeseros();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._meseroService
      .buscarMeseros(termino)
      .subscribe((meseros: Mesero[]) => {
        // console.log(meseros);
        this.totalRegistros = meseros.length;
        this.meseros = meseros;
      });
    this.cargando = false;
  }

  borrarMesero(id: string) {
    // console.log(id);
    Swal.fire({
      title: "¿Estas seguro de eliminar a este mesero?",
      text: "Una vez eliminado no es posible recuperar al mesero",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    })!.then(borrar => {
      // console.log(borrar);
      if (borrar) {
        this._meseroService.borrarMesero(id).subscribe(resp => {
          // console.log(resp);
          this.cargarMeseros();
        });
      } else {
        Swal.fire( "El mesero no fue eliminado", "El mesero no ha sido eliminado" );
        // alert("El mesero no fue eliminado");
      }
    });
  }

  crearMesero(nombre: string) {
    Swal.fire({
      title: 'Alta de nuevo mesero',
      text: 'Por favor escriba el nombre del mesero:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del mesero'
        }
      }
    }).then(value => {
      let mesero = new Mesero();

      // mesero.clave = value.value;  
      mesero.fechaActualizacion = new Date();
      mesero.usuario =  this._usuarioService.usuario._id;

      this._meseroService.crearMesero(mesero)
                        .subscribe(resp => {
                          console.log(resp);
                          this.cargarMeseros();
                          Swal.fire('Se ha creado al mesero:', resp.nombre, 'success' );
                      });
    });
  }

  guardarMesero(mesero: Mesero) {
    mesero.usuario =  this._usuarioService.usuario._id;
    this._meseroService.actualizarMesero(mesero).subscribe(resp => {
      console.log(resp);
    });
  }
}
