import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  mensaje;

  constructor(private dialogRef: MatDialogRef<LoginDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.mensaje = data.mensaje;
   }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
  }

}
