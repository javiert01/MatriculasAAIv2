import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-saldo-pendiente',
  templateUrl: './dialog-saldo-pendiente.component.html',
  styleUrls: ['./dialog-saldo-pendiente.component.css']
})
export class DialogSaldoPendienteComponent implements OnInit {

  opcion;

  constructor(private dialogRef: MatDialogRef<DialogSaldoPendienteComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.opcion = data.opcion;
  }

  ngOnInit() {
  }

  aceptar() {
    this.dialogRef.close('aceptar');
  }

  close() {
    this.dialogRef.close();
  }


}
