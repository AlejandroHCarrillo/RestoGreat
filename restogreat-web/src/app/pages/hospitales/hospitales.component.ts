import { ModalUploadService } from "./../../components/modal-upload/modal-upload.service";
import { HospitalService } from "src/app/services/service.index";
import { Component, OnInit } from "@angular/core";
import { Hospital } from "src/app/models/hospital.model";
import Swal from 'sweetalert2'

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styleUrls: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("hospitales", id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService
      .cargarHospitales(this.desde)
      .subscribe((resp: any) => {
        //  console.log(resp);
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
      });
    this.cargando = false;
  }

  cambiarPagina(pagina: number) {
    if (this.desde + pagina < 0) {
      this.desde = 0;
      // this.cargarHospitales();
    } else if (this.desde + pagina >= this.totalRegistros) {
      return;
    } else {
      this.desde += pagina;
      this.cargarHospitales();
    }
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    // console.log(termino);
    this.cargando = true;
    this._hospitalService
      .buscarHospitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        // console.log(hospitales);
        this.totalRegistros = hospitales.length;
        this.hospitales = hospitales;
      });
    this.cargando = false;
  }

  borrarHospital(id: string) {
    // console.log(id);
    // confirm()

    Swal.fire({
      title: "¿Estas seguro de eliminar a este hospital?",
      text: "Una vez eliminado no es posible recuperar al hospital",
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
        this._hospitalService.borrarHospital(id).subscribe(resp => {
          this.cargarHospitales();
        });
      } else {
        // console.log('NO BORRADO');
        Swal.fire( "El hospital no fue eliminado", "El hospital no ha sido eliminado" );
      }
    });

  }

  crearHospital() {

    Swal.fire({
      title: 'Alta de nuevo hospital',
      text: 'Por favor escriba el nombre del hospital:',
      input: 'text',
      // inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor escriba el nombre del hospital'
        }
      }
    }).then( (value) => {
      console.log(value);
      this._hospitalService.crearHospital(value.value)
                           .subscribe(resp => { 
                             console.log(resp);
                             Swal.fire('Se ha creado el hospital:', resp.nombre, 'success' );
                            });
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe(resp => {
      console.log(resp);
    });
  }
}
