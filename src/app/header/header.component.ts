import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  rol = localStorage.getItem('rol');
  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }

}
