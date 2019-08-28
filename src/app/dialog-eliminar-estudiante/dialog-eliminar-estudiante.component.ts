import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-eliminar-estudiante',
  templateUrl: './dialog-eliminar-estudiante.component.html',
  styleUrls: ['./dialog-eliminar-estudiante.component.css']
})
export class DialogEliminarEstudianteComponent implements OnInit {

  mensaje;

  constructor(private dialogRef: MatDialogRef<DialogEliminarEstudianteComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-estudiantes']);
  }

}
