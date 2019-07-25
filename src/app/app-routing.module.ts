import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { StudentComponent } from './student/student.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
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

const appRoutes: Routes = [
    { path: '', redirectTo: '/inicio-sesion', pathMatch: 'full'},
    { path: 'inicio-sesion' , component: SignInComponent, canActivate: [NoLoginGuard]},
    { path: 'opciones-pago', canActivate: [AuthGuard], component: OpcionPagoComponent},
    { path: 'reporte-pago', canActivate: [AuthGuard], component: ReportePagoComponent,  resolve: {
        student: StudentResolve
      }
    },
    { path: 'reporte-descuento', component: ReporteDescuentoComponent, canActivate: [AdminGuard],  children: [
        { path: ':id', component: ReporteDescuentoDetailComponent}
    ] },
    { path: 'admin-page', component: AdminPageComponent, canActivate: [AdminGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [AdminGuard]},
    { path: 'opciones-estudiantes', component: OpcionesEstudianteComponent, canActivate: [AdminGuard], children: [
        { path: 'registro-estudiante', component: RegistroEstudianteComponent},
        { path: 'editar-estudiante', component: EditarEstudianteComponent}
    ]},
    { path: 'opciones-familias', component: OpcionesFamiliaComponent, canActivate: [AdminGuard]},
    { path: 'opciones-categorias', component: OpcionesCategoriaComponent, canActivate: [AdminGuard]},
    { path: 'opciones-grados', component: OpcionesGradoComponent, canActivate: [AdminGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
