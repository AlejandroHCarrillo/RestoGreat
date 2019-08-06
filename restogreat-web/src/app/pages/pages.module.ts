import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

//Restaurant 
import { SeccionesComponent } from './restaurant/secciones/secciones.component';
import { GruposComponent } from './restaurant/grupos/grupos.component';
import { GrupoComponent } from './restaurant/grupos/grupo.component';
import { ColascomandaComponent } from './restaurant/colascomanda/colascomanda.component';
import { ProductosComponent } from './restaurant/productos/productos.component';
import { ProductoComponent } from './restaurant/productos/producto.component';
import { MeserosComponent } from './restaurant/meseros/meseros.component';
import { MeseroComponent } from './restaurant/meseros/mesero.component';
import { FormaspagoComponent } from './restaurant/formaspago/formaspago.component';
import { FormapagoComponent } from './restaurant/formaspago/formapago.component';
import { AreasventaComponent } from './restaurant/areasventa/areasventa.component';
import { AreaventaComponent } from './restaurant/areasventa/areaventa.component';
import { ClientesComponent } from './restaurant/clientes/clientes.component';
import { ClienteComponent } from './restaurant/clientes/cliente.component';
import { RubrosComponent } from './restaurant/rubros/rubros.component';
import { RubroComponent } from './restaurant/rubros/rubro.component';
import { ModificadoresComponent } from './restaurant/modificadores/modificadores.component';
import { ModificadorComponent } from './restaurant/modificadores/modificador.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalesComponent,        
        MedicosComponent,
        MedicoComponent,
        // ModalUploadComponent,
        BusquedaComponent,
        SeccionesComponent,
        GruposComponent,
        GrupoComponent,
        ColascomandaComponent,
        ProductosComponent,
        ProductoComponent,
        MeserosComponent,
        MeseroComponent,
        FormaspagoComponent,
        FormapagoComponent,
        AreasventaComponent,
        AreaventaComponent,
        ClientesComponent,
        ClienteComponent,
        RubrosComponent,
        RubroComponent,
        ModificadoresComponent,
        ModificadorComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})
export class PagesModule { }
