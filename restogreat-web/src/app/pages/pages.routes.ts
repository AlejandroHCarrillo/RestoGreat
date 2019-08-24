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
import { MeseroComponent } from './restaurant/meseros/mesero.component';
import { FormaspagoComponent } from './restaurant/formaspago/formaspago.component';
import { FormapagoComponent } from './restaurant/formaspago/formapago.component';
import { AreasventaComponent } from './restaurant/areasventa/areasventa.component';
import { AreaventaComponent } from './restaurant/areasventa/areaventa.component';
import { ClienteComponent } from './restaurant/clientes/cliente.component';
import { ClientesComponent } from './restaurant/clientes/clientes.component';
import { RubrosComponent } from './restaurant/rubros/rubros.component';
import { RubroComponent } from './restaurant/rubros/rubro.component';
import { ModificadoresComponent } from './restaurant/modificadores/modificadores.component';
import { ModificadorComponent } from './restaurant/modificadores/modificador.component';
import { CausascancelacionComponent } from './restaurant/causascancelacion/causascancelacion.component';
import { TurnosComponent } from './restaurant/turnos/turnos.component';
import { TurnoComponent } from './restaurant/turnos/turno.component';
import { CuentasComponent } from './restaurant/cuentas/cuentas.component';
import { CuentaComponent } from './restaurant/cuentas/cuenta.component';
import { BancosComponent } from './restaurant/bancos/bancos.component';
import { BancoComponent } from './restaurant/bancos/banco.component';
import { ConceptosdescuentoComponent } from './restaurant/conceptosdescuento/conceptosdescuento.component';
import { ConceptodescuentoComponent } from './restaurant/conceptosdescuento/conceptodescuento.component';
import { PagoComponent } from './restaurant/pagos/pago.component';
import { PagosComponent } from './restaurant/pagos/pagos.component';

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

    { path: 'meseros', component: MeserosComponent, data: { titulo: 'Lista de meseros' } },
    { path: 'mesero/:id', component: MeseroComponent, data: { titulo: 'Mantenimiento a meseros' } },

    { path: 'formaspago', component: FormaspagoComponent, data: { titulo: 'Lista de formas de pago' } },
    { path: 'formapago/:id', component: FormapagoComponent, data: { titulo: 'Mantenimiento a foma de pago' } },

    { path: 'areasventa', component: AreasventaComponent, data: { titulo: 'Lista de las areas de venta' } },
    { path: 'areaventa/:id', component: AreaventaComponent, data: { titulo: 'Mantenimiento las areas de venta' } },

    { path: 'clientes', component: ClientesComponent, data: { titulo: 'Lista de clientes' } },
    { path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Mantenimiento clientes' } },

    { path: 'rubros', component: RubrosComponent, data: { titulo: 'Lista de rubros' } },
    { path: 'rubro/:id', component: RubroComponent, data: { titulo: 'Mantenimiento rubros' } },

    { path: 'modificadores', component: ModificadoresComponent, data: { titulo: 'Lista de modificadores' } },
    { path: 'modificador/:id', component: ModificadorComponent, data: { titulo: 'Mantenimiento modificadores' } },

    { path: 'causascancelacion', component: CausascancelacionComponent, data: { titulo: 'Lista de causas de cancelacion' } },

    { path: 'turnos', component:    TurnosComponent, data: { titulo: 'Lista de turnos' } },
    { path: 'turno/:id', component: TurnoComponent, data: { titulo: 'Abrir turno caja' } },

    { path: 'cuentas', component:    CuentasComponent, data: { titulo: 'Lista de cuentas' } },
    { path: 'cuenta/:id', component: CuentaComponent, data: { titulo: 'Abrir cuenta' } },

    { path: 'bancos', component:    BancosComponent, data: { titulo: 'Lista de bancos' } },
    { path: 'banco/:id', component: BancoComponent, data: { titulo: 'Mantenimiento a bancos' } },

    { path: 'conceptosdescuento', component: ConceptosdescuentoComponent, data: { titulo: 'Lista de conceptos de descuento' } },
    { path: 'conceptodescuento/:id', component: ConceptodescuentoComponent, data: { titulo: 'Mantenimiento a conceptos de descuento' } },

    { path: 'pagos', component: PagosComponent, data: { titulo: 'Lista de conceptos de pagos' } },
    { path: 'pago/:id', component: PagoComponent, data: { titulo: 'Cambios a los pagos' } },


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
