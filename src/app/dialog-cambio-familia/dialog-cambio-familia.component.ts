import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-cambio-familia',
  templateUrl: './dialog-cambio-familia.component.html',
  styleUrls: ['./dialog-cambio-familia.component.css']
})
export class DialogCambioFamiliaComponent implements OnInit {

  mensaje;
  constructor(private dialogRef: MatDialogRef<DialogCambioFamiliaComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-estudiantes']);
  }

}
