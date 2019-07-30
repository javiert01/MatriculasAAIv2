import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentService } from './student/student.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { TipoGradoPipe } from './pipes/tipogrado.pipe';
import { OpcionPagoComponent } from './opcion-pago/opcion-pago.component';
import { OpcionPagoListaComponent } from './opcion-pago/opcion-pago-lista/opcion-pago-lista.component';
import { WINDOW_PROVIDERS } from './window.service';
import { ReportePagoComponent } from './reporte-pago/reporte-pago.component';
import { StudentResolve } from './resolvers/student.resolve';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { StudentModule } from './student/student.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterComponent } from './register/register.component';
import { NoLoginGuard } from './auth/no-login.guard';
import { AdminGuard } from './auth/admin.guard';
import { ReporteDescuentoComponent } from './reporte-descuento/reporte-descuento.component';
import { MatProgressBarModule, MatDialogModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { ReporteDescuentoDetailComponent } from './reporte-descuento/reporte-descuento-detail/reporte-descuento-detail.component';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { SingupComponent } from './auth/singup/singup.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { OpcionesEstudianteComponent } from './opciones-estudiante/opciones-estudiante.component';
import { OpcionesFamiliaComponent } from './opciones-familia/opciones-familia.component';
import { OpcionesCategoriaComponent } from './opciones-categoria/opciones-categoria.component';
import { OpcionesGradoComponent } from './opciones-grado/opciones-grado.component';
import { RegistroEstudianteComponent } from './opciones-estudiante/registro-estudiante/registro-estudiante.component';
import { EditarEstudianteComponent } from './opciones-estudiante/editar-estudiante/editar-estudiante.component';
import { DialogOpcionPagoComponent } from './dialog-opcion-pago/dialog-opcion-pago.component';
import { DialogSaldoPendienteComponent } from './dialog-saldo-pendiente/dialog-saldo-pendiente.component';
import { OpcionesGradoListaComponent } from './opciones-grado/opciones-grado-lista/opciones-grado-lista.component';
import { OpcionesGradoDetalleComponent } from './opciones-grado/opciones-grado-detalle/opciones-grado-detalle.component';
import { DialogEditarGradoComponent } from './dialog-editar-grado/dialog-editar-grado.component';
import { OpcionesCategoriaListaComponent } from './opciones-categoria/opciones-categoria-lista/opciones-categoria-lista.component';
import { OpcionesCategoriaDetalleComponent } from './opciones-categoria/opciones-categoria-detalle/opciones-categoria-detalle.component';
import { DialogEditarCategoriaComponent } from './dialog-editar-categoria/dialog-editar-categoria.component';
import { RegistroFamiliaComponent } from './opciones-familia/registro-familia/registro-familia.component';
import { EditarFamiliaComponent } from './opciones-familia/editar-familia/editar-familia.component';
import { DialogRegistroFamiliaComponent } from './dialog-registro-familia/dialog-registro-familia.component';
import { ListaFamiliasComponent } from './opciones-familia/editar-familia/lista-familias/lista-familias.component';
import { DetalleFamiliaComponent } from './opciones-familia/editar-familia/detalle-familia/detalle-familia.component';
import { DialogEditarFamiliaComponent } from './dialog-editar-familia/dialog-editar-familia.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HeaderComponent,
    OpcionPagoComponent,
    OpcionPagoListaComponent,
    ReportePagoComponent,
    AdminPageComponent,
    RegisterComponent,
    ReporteDescuentoComponent,
    ReporteDescuentoDetailComponent,
    LoginAdminComponent,
    SingupComponent,
    LoginDialogComponent,
    OpcionesEstudianteComponent,
    OpcionesFamiliaComponent,
    OpcionesCategoriaComponent,
    OpcionesGradoComponent,
    RegistroEstudianteComponent,
    EditarEstudianteComponent,
    DialogOpcionPagoComponent,
    DialogSaldoPendienteComponent,
    OpcionesGradoListaComponent,
    OpcionesGradoDetalleComponent,
    DialogEditarGradoComponent,
    OpcionesCategoriaListaComponent,
    OpcionesCategoriaDetalleComponent,
    DialogEditarCategoriaComponent,
    RegistroFamiliaComponent,
    EditarFamiliaComponent,
    DialogRegistroFamiliaComponent,
    ListaFamiliasComponent,
    DetalleFamiliaComponent,
    DialogEditarFamiliaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ClickOutsideModule,
    ReactiveFormsModule,
    HttpClientModule,
    StudentModule,
    MatProgressBarModule,
    MatDialogModule,
    SharedModule
  ],
  providers: [StudentService, WINDOW_PROVIDERS, StudentResolve, AuthGuard, AuthService, NoLoginGuard, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent, DialogOpcionPagoComponent, DialogSaldoPendienteComponent, DialogEditarGradoComponent,
  DialogEditarCategoriaComponent, DialogRegistroFamiliaComponent, DialogEditarFamiliaComponent]
})
export class AppModule { }
