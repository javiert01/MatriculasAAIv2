import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-opcion-pago',
  templateUrl: './dialog-opcion-pago.component.html',
  styleUrls: ['./dialog-opcion-pago.component.css']
})
export class DialogOpcionPagoComponent implements OnInit {
  formaPago;
  metodoPago;

  constructor(private dialogRef: MatDialogRef<DialogOpcionPagoComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.formaPago = data.formaPago;
    this.metodoPago = data.metodoPago;

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
