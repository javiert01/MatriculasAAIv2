import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginUserData: User;
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {

  }

  hidePopup(){
  }

  onSignin(form: NgForm) {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
      localStorage.setItem('token', res.token)
      this._router.navigate(['/estudiantes'])
      },

      err => {
      }
    );
    console.log(this.loginUserData);
  }


}
