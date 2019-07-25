import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST } from '../shared/var.constant';

@Injectable()
export class AuthService {
  url: string = `${HOST}/user`;

  private _registerUrl = 'http://192.168.91.28:1337/user/signup';
  private _loginUrl = 'http://192.168.91.28:1337/user/login';

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.url + '/signup', user);
  }

  loginUser(user) {
    return this.http.post<any>(this.url + '/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
    this._router.navigate(['/inicio-sesion']);

  }

  getUserData(username: string) {
    return this.http.get<any>(this.url + '/' + username);
  }

  getUserDataRol(rol: string) {
    return this.http.get<any>(this.url + '/' + rol);
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
