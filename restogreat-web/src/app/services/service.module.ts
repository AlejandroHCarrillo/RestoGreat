import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginGuardGuard,
  AdminGuard,
  VerificatokenGuard,
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  HospitalService,
  MedicoService,
  SubirArchivoService, 

  SeccionService,
  GrupoService, 
  ColacomandaService,
  ProductoService,
  MeseroService
 } from './service.index';
import { Mesero } from '../models/mesero.model';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuardGuard,
    AdminGuard,
    VerificatokenGuard,
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    MedicoService,
    SubirArchivoService,
    ModalUploadService,

    SeccionService,
    GrupoService,
    ColacomandaService,
    ProductoService,
    MeseroService
  ],
  declarations: []
})
export class ServiceModule { }
