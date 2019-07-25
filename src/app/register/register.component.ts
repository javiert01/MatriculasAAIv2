import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '../models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerUserData: User = {
    username: '',
    NOMBRE: '',
    password: '',
    rol: ''
  };

  constructor(private _auth: AuthService) {
   }

  ngOnInit() {
  }


  registerUser(form: NgForm) {

    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {

      },
      err => {
        if (err.status === 200) {
        }
       }
    );
  }

}
