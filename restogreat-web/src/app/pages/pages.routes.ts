import { VerificatokenGuard } from '../services/service.index';
import { AdminGuard } from './../services/guards/admin.guard';

import { BusquedaComponent } from './busqueda/busqueda.component';
import { RouterModule, Routes } from '@angular/router';

import { HospitalesComponent } from './hospitales/hospitales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';


// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';
import { GruposComponent } from './restaurant/grupos/grupos.component';
import { GrupoComponent } from './restaurant/grupos/grupo.component';
import { SeccionesComponent } from './restaurant/secciones/secciones.component';
import { ColascomandaComponent } from './restaurant/colascomanda/colascomanda.component';
import { ProductosComponent } from './restaurant/productos/productos.component';
import { ProductoComponent } from './restaurant/productos/producto.component';
import { MeserosComponent } from './restaurant/meseros/meseros.component';


const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [ VerificatokenGuard ], data: { titulo: 'Dashboard' } },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    // Restaurant
    { path: 'secciones', component: SeccionesComponent, data: { titulo: 'Mantenimiento de secciones' } },
    { path: 'secciones/:id', component: SeccionesComponent, data: { titulo: 'Actualizar seccion' } },
    { path: 'grupos', component: GruposComponent, data: { titulo: 'Mantenimiento de grupos' } },
    { path: 'grupo/:id', component: GrupoComponent, data: { titulo: 'Actualizar grupo' } },
    { path: 'colascomanda', component: ColascomandaComponent, data: { titulo: 'Colas de impresion de comandas' } },
    { path: 'producto', component: ProductosComponent, data: { titulo: 'Lista de Platillos / productos' } },
    { path: 'producto/:id', component: ProductoComponent, data: { titulo: 'Mantenimiento de Platillos / productos' } },

    { path: 'meseros', component: MeserosComponent, data: { titulo: 'Lista de  meseros' } },
    // { path: 'mesero/:id', component: MeseroComponent, data: { titulo: 'Mantenimiento a meseros' } },


    //  Mantenimiento
    {   path: 'usuarios', 
        component: UsuariosComponent, 
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' },

    },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
