import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/student/student.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogEliminarEstudianteComponent } from 'src/app/dialog-eliminar-estudiante/dialog-eliminar-estudiante.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-eliminar-detalle-estudiante',
  templateUrl: './eliminar-detalle-estudiante.component.html',
  styleUrls: ['./eliminar-detalle-estudiante.component.css']
})
export class EliminarDetalleEstudianteComponent implements OnInit {

  estudiante;

  constructor(private studentService: StudentService, private route: ActivatedRoute
    , private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
    .map(params => params['id'])
    // tslint:disable-next-line: deprecation
    .switchMap(estudiante => estudiante ? this.studentService.getStudent(estudiante) : Observable.empty())
    .subscribe(estudiante => {
      this.estudiante = estudiante;
    });
  }

  eliminarEstudiante() {
    this.studentService.deleteStudent(this.estudiante.id)
    .subscribe(
      (data) => {
        this.openDialog('1');
      },
      (err) => {
        this.openDialog('2');
      }
    );
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
    this.dialog.open(DialogEliminarEstudianteComponent, dialogConfig);
  }

}
