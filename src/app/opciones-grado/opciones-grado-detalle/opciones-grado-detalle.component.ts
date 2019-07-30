import { Component, OnInit } from '@angular/core';
import { GradoService } from 'src/app/grado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControlDirective, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';
import { DialogEditarGradoComponent } from 'src/app/dialog-editar-grado/dialog-editar-grado.component';

@Component({
  selector: 'app-opciones-grado-detalle',
  templateUrl: './opciones-grado-detalle.component.html',
  styleUrls: ['./opciones-grado-detalle.component.css']
})
export class OpcionesGradoDetalleComponent implements OnInit {
  grado;
  gradoForm: FormGroup;

  constructor(private gradoService: GradoService, private route: ActivatedRoute,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
    .pipe(map(params => params['id']))
    // tslint:disable-next-line: deprecation
    .switchMap(id => id ? this.gradoService.getGradoID(id) : Observable.empty())
    .subscribe(grado => {
      this.grado = grado;
      this.gradoForm = new FormGroup({
        'nombreGrado': new FormControl(this.grado.TIPO_GRADO, Validators.required),
        'costoPension': new FormControl(this.grado.COSTO_PENSION, Validators.required),
        'costoMatricula': new FormControl(this.grado.COSTO_MATRICULA, Validators.required)
      });
    });
  }

  actualizarDatos() {
    const nombreGrado = this.gradoForm.get('nombreGrado').value;
    const costoPension = this.gradoForm.get('costoPension').value;
    const costoMatricula = this.gradoForm.get('costoMatricula').value;
    const nuevosDatos = {
      TIPO_GRADO: nombreGrado,
      COSTO_MATRICULA: costoMatricula,
      COSTO_PENSION: costoPension
    };
    this.gradoService.actualizarDatosGrado(this.grado.id, nuevosDatos)
    .subscribe(
      (data) => {
        this.openDialog('1');
      },
      (err) => {
        this.openDialog('2');
      }
    );
  }

  onReturn() {
    this.router.navigate(['/opciones-grados']);
  }

  openDialog(respuesta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      mensaje: respuesta
    };
    this.dialog.open(DialogEditarGradoComponent, dialogConfig);

  }
}
