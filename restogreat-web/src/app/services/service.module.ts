import { Causacancelacion } from 'src/app/models/causacancelacion.model';
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
  MeseroService,
  FormaPagoService,
  AreaventaService, 
  ClienteService,
  RubroService,
  ModificadorService,
  CausacancelacionService
 } from './service.index';

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
    MeseroService,
    FormaPagoService,
    AreaventaService,
    ClienteService,
    RubroService,
    ModificadorService,
    CausacancelacionService
  ],
  declarations: []
})
export class ServiceModule { }
