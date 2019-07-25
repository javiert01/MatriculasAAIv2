import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginUserData = {
    'username': '',
    'password': ''
  };
  constructor(private _auth: AuthService, private _router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(respuesta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      mensaje: respuesta
    };
    this.dialog.open(LoginDialogComponent, dialogConfig);

  }

  onSignin(form: NgForm) {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
      console.log(res);
      console.log(this.loginUserData);
       localStorage.setItem('token', res.token);
       localStorage.setItem('username', this.loginUserData['username']);
       const nombre: string = this.loginUserData['username'];
       this._auth.getUserData(nombre)
       .subscribe(
         (user) => {
          localStorage.setItem('rol', user.rol);
          if (user.rol === 'Administrador') {
          console.log('son iguales');
          this._router.navigate(['/admin-page']);
          } else {
          console.log('no son iguales');
          this._router.navigate(['/estudiantes']);
          }
        },
        (error) => console.log('existe un error')
       );
      },

      err => {
        this.openDialog(err.error.err);
      }
    );
  }

}
