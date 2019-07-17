import { Medico } from './../../models/medico.model';
import { Hospital } from './../../models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  termino: string = "";


  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient
    ) { 
    activatedRoute.params.subscribe(params => {      
      this.termino = params.termino;
      console.log(this.termino);
      this.buscar(this.termino);
    });
  }

  ngOnInit() {
    
  }

  buscar( termino: string){
    let url = URL_SERVICIOS +  '/busqueda/todo/' + termino;

    this.http.get(url).subscribe((resp:any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    } ) ;

  }

}
