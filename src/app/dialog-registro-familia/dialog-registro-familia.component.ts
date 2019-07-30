import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-registro-familia',
  templateUrl: './dialog-registro-familia.component.html',
  styleUrls: ['./dialog-registro-familia.component.css']
})
export class DialogRegistroFamiliaComponent implements OnInit {

  mensaje;

  constructor(private dialogRef: MatDialogRef<DialogRegistroFamiliaComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-familias']);
  }
}
