import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { OpcionPagoComponent } from './opcion-pago/opcion-pago.component';
import { ReportePagoComponent } from './reporte-pago/reporte-pago.component';
import { StudentResolve } from './resolvers/student.resolve';
import { AuthGuard } from './auth/auth.guard';
import { NoLoginGuard } from './auth/no-login.guard';
import { ReporteDescuentoComponent } from './reporte-descuento/reporte-descuento.component';
import { AdminGuard } from './auth/admin.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterComponent } from './register/register.component';
import { ReporteDescuentoDetailComponent } from './reporte-descuento/reporte-descuento-detail/reporte-descuento-detail.component';
import { OpcionesEstudianteComponent } from './opciones-estudiante/opciones-estudiante.component';
import { OpcionesFamiliaComponent } from './opciones-familia/opciones-familia.component';
import { OpcionesCategoriaComponent } from './opciones-categoria/opciones-categoria.component';
import { OpcionesGradoComponent } from './opciones-grado/opciones-grado.component';
import { RegistroEstudianteComponent } from './opciones-estudiante/registro-estudiante/registro-estudiante.component';
import { EditarEstudianteComponent } from './opciones-estudiante/editar-estudiante/editar-estudiante.component';
import { OpcionesGradoDetalleComponent } from './opciones-grado/opciones-grado-detalle/opciones-grado-detalle.component';
import { OpcionesCategoriaDetalleComponent } from './opciones-categoria/opciones-categoria-detalle/opciones-categoria-detalle.component';
import { RegistroFamiliaComponent } from './opciones-familia/registro-familia/registro-familia.component';
import { EditarFamiliaComponent } from './opciones-familia/editar-familia/editar-familia.component';
import { DetalleFamiliaComponent } from './opciones-familia/editar-familia/detalle-familia/detalle-familia.component';
// tslint:disable-next-line: max-line-length
import { EditarEstudianteDetalleComponent } from './opciones-estudiante/editar-estudiante/editar-estudiante-detalle/editar-estudiante-detalle.component';
import { CambioFamiliaEstudianteComponent } from './opciones-estudiante/cambio-familia-estudiante/cambio-familia-estudiante.component';
import { EliminarEstudianteComponent } from './opciones-estudiante/eliminar-estudiante/eliminar-estudiante.component';
// tslint:disable-next-line: max-line-length
import { EliminarDetalleEstudianteComponent } from './opciones-estudiante/eliminar-estudiante/eliminar-detalle-estudiante/eliminar-detalle-estudiante.component';
import { EstudiantesEstadoComponent } from './estudiantes-estado/estudiantes-estado.component';
import { DetalleEstudiantesEstadoComponent } from './estudiantes-estado/detalle-estudiantes-estado/detalle-estudiantes-estado.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full'},
    { path: 'inicio-sesion' , component: SignInComponent, canActivate: [NoLoginGuard]},
    { path: 'opciones-pago', canActivate: [AuthGuard], component: OpcionPagoComponent},
    { path: 'reporte-pago', canActivate: [AuthGuard], component: ReportePagoComponent,  resolve: {
        student: StudentResolve
      }
    },
    { path: 'reportes-admin', component: ReporteDescuentoComponent, canActivate: [AdminGuard],  children: [
        { path: ':id', component: ReporteDescuentoDetailComponent}
    ] },
    { path: 'admin-page', component: AdminPageComponent, canActivate: [AdminGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [AdminGuard]},
    { path: 'lista-estudiantes-estado', component: EstudiantesEstadoComponent, canActivate: [AdminGuard],children: [
      {path: ':id', component: DetalleEstudiantesEstadoComponent}
    ]},
    { path: 'opciones-estudiantes', component: OpcionesEstudianteComponent, canActivate: [AdminGuard], children: [
        { path: 'registro-estudiante', component: RegistroEstudianteComponent},
        { path: 'editar-estudiante', component: EditarEstudianteComponent, children: [
          {path: ':id', component: EditarEstudianteDetalleComponent }
        ]},
        { path: 'eliminar-estudiante', component: EliminarEstudianteComponent, children: [
          {path: ':id', component: EliminarDetalleEstudianteComponent }
        ]},
        { path: 'cambio-familia-estudiante', component: CambioFamiliaEstudianteComponent},
    ]},
    { path: 'opciones-familias', component: OpcionesFamiliaComponent, canActivate: [AdminGuard], children: [
      { path: 'registro-familia', component: RegistroFamiliaComponent},
      { path: 'editar-familia', component: EditarFamiliaComponent, children: [
        { path: ':id', component: DetalleFamiliaComponent}
      ]}
    ]},
    { path: 'opciones-categorias', component: OpcionesCategoriaComponent, canActivate: [AdminGuard], children: [
      { path: ':id', component: OpcionesCategoriaDetalleComponent}
    ] },
    { path: 'opciones-grados', component: OpcionesGradoComponent, canActivate: [AdminGuard], children: [
      { path: ':id', component: OpcionesGradoDetalleComponent}
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
