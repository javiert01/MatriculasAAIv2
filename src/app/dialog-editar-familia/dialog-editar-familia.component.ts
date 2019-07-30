import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-editar-familia',
  templateUrl: './dialog-editar-familia.component.html',
  styleUrls: ['./dialog-editar-familia.component.css']
})
export class DialogEditarFamiliaComponent implements OnInit {

  mensaje;

  constructor(private dialogRef: MatDialogRef<DialogEditarFamiliaComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-familias']);
  }

}
