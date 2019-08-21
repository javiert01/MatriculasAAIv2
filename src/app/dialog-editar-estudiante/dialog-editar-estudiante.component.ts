import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-editar-estudiante',
  templateUrl: './dialog-editar-estudiante.component.html',
  styleUrls: ['./dialog-editar-estudiante.component.css']
})
export class DialogEditarEstudianteComponent implements OnInit {

  mensaje;
  constructor(private dialogRef: MatDialogRef<DialogEditarEstudianteComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-estudiantes']);
  }

}
