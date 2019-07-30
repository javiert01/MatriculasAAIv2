import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-editar-categoria',
  templateUrl: './dialog-editar-categoria.component.html',
  styleUrls: ['./dialog-editar-categoria.component.css']
})
export class DialogEditarCategoriaComponent implements OnInit {

  mensaje;

  constructor(private dialogRef: MatDialogRef<DialogEditarCategoriaComponent>, @Inject(MAT_DIALOG_DATA) data, private router: Router) {
    this.mensaje = data.mensaje;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
    this.router.navigate(['/opciones-categorias']);
  }

}
