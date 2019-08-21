import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-registro-estudiante',
  templateUrl: './dialog-registro-estudiante.component.html',
  styleUrls: ['./dialog-registro-estudiante.component.css']
})
export class DialogRegistroEstudianteComponent implements OnInit {

  mensaje;
  constructor(private dialogRef: MatDialogRef<DialogRegistroEstudianteComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-estudiantes']);
  }



}
