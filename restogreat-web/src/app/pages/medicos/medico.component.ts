import { ModalUploadService } from "./../../components/modal-upload/modal-upload.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Medico } from "src/app/models/medico.model";
import {
  HospitalService,
  MedicoService,
  UsuarioService
} from "src/app/services/service.index";
import { Hospital } from "./../../models/hospital.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: []
})
export class MedicoComponent implements OnInit {
  hospital: Hospital = new Hospital("");
  hospitales: Hospital[] = [];
  medico: Medico = new Medico("", "", "", "", "");
  idparam: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _hospitalService: HospitalService,
    public _medicoService: MedicoService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params.id;
      this.idparam = id;
      if (id !== "nuevo") {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService
      .cargarHospitales()
      .subscribe((resp:any) => (this.hospitales = resp.hospitales));
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe(medico => {
      console.log(medico);

      this.medico = medico;
      this.medico.hospital = medico.hospital._id;

      this.hospital = medico.hospital._id;

      this.cambioHospital(this.medico.hospital);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    // setteamos el usuario actual que hace la modificacion
    this.medico.usuario = this._usuarioService.usuario._id;

    if (this.idparam === "nuevo") {
      // console.log('Creando Medico');
      this._medicoService.crearMedico(this.medico).subscribe(medico => {
        this.medico = medico;
        this.router.navigate(["/medico", this.medico._id]);
      });
    } else {
      // console.log('Actualizando Medico');
      this._medicoService.actualizarMedico(this.medico).subscribe(medico => {
        this.router.navigate(["/medico", this.idparam]);
      });
    }
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id).subscribe(hospital => {
      this.hospital = hospital;
      if (this.hospital) {
        // console.log(this.hospital.img);
      }
    });
  }

  cambiarFoto(id: string) {
    this._modalUploadService.mostrarModal("medicos", id);

    this._modalUploadService.notificacion.subscribe(resp => {
      console.log(resp);
      this.medico.img = resp.data.img;
    });
  }
}
