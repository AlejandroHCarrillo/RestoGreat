import { UsuarioService } from './../../../services/usuario/usuario.service';
import { ModalUploadService } from "./../../../components/modal-upload/modal-upload.service";
import { AreaventaService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { AreaVenta } from "src/app/models/areaventa.model";
import Swal from 'sweetalert2'

@Component({
  selector: "app-areasventa",
  templateUrl: "./areasventa.component.html",
  styleUrls: []
})
export class AreasventaComponent implements OnInit {
  areasventa: AreaVenta[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _areaventaService: AreaventaService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarAreasventa();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarAreasventa();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("areasventa", id);
  }

  cargarAreasventa() {
    this.cargando = true;
    this._areaventaService
      .cargarAreasventa(this.desde)
      .subscribe((resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.areasventa = resp.areasventa;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarAreasventa();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarAreasventa();
    }
  }

  buscarAreaventa(termino: string) {
    if (termino.length <= 0) {
      this.cargarAreasventa();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._areaventaService
      .buscarAreasventa(termino)
      .subscribe((areasventa: AreaVenta[]) => {
        // console.log(areasventa);
        this.totalRegistros = areasventa.length;
        this.areasventa = areasventa;
      });
    this.cargando = false;
  }

  borrarAreaventa(id: string) {
    // console.log(id);
    // confirm()

    Swal.fire({
      title: "¿Estas seguro de eliminar a este areaventa?",
      text: "Una vez eliminado no es posible recuperar al areaventa",
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
        this._areaventaService.borrarAreaventa(id).subscribe(resp => {
          this.cargarAreasventa();
        });
      } else {
        // console.log('NO BORRADO');
        Swal.fire( "El areaventa no fue eliminado", "El areaventa no ha sido eliminado" );
      }
    });

  }

    crearAreaventa(nombre: string) {
      Swal.fire({
        title: 'Alta de nueva forma de pago',
        text: 'Por favor escriba el nombre del areaventa:',
        input: 'text',
        // inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor escriba el nombre del areaventa'
          }
        }
      }).then(value => {
        let areaventa = new AreaVenta();
  
        areaventa.clave = value.value;  
        areaventa.fechaActualizacion = new Date();
        areaventa.usuario =  this._usuarioService.usuario._id;
  
        this._areaventaService.crearAreaventa(areaventa)
                          .subscribe(resp => {
                            console.log(resp);
                            this.cargarAreasventa();
                            Swal.fire('Se ha creado al areaventa:', resp.nombre, 'success' );
                        });
      });
    }

  guardarAreaventa(areaventa: AreaVenta) {
    this._areaventaService.actualizarAreaventa(areaventa).subscribe(resp => {
      console.log(resp);
    });
  }
}
