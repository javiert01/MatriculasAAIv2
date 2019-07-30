import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-editar-grado',
  templateUrl: './dialog-editar-grado.component.html',
  styleUrls: ['./dialog-editar-grado.component.css']
})
export class DialogEditarGradoComponent implements OnInit {
  mensaje;

  constructor(private dialogRef: MatDialogRef<DialogEditarGradoComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-grados']);
  }

}
