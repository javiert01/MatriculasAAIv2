import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  userName = localStorage.getItem('username');
  user: User;
  opcionesEstadistica = [
    {titulo:  'Estudiantes', descripcion: 'Registre nuevos estudiantes o edite la información de los mismos',
      imagen: '/assets/iconos/icono-estudiantes.png', ruta: '/opciones-estudiantes'},
    {titulo: 'Familias', descripcion: 'Registre nuevas familias o edite la información de las mismas' ,
    imagen: '/assets/iconos/icono-familia.png', ruta: '/opciones-familias'},
    {titulo: 'Categorías', descripcion: 'Edite la información de las categorias',
    imagen: '/assets/iconos/icono-categoria.png', ruta: '/opciones-categorias'},
    {titulo: 'Grados', descripcion: 'Edite la información de los grados de la AAI',
    imagen: '/assets/iconos/icono-grado.png', ruta: '/opciones-grados'},
    {titulo: 'Reportes', descripcion: 'Mire los reportes de los datos del sistema',
    imagen: '/assets/iconos/icono-reporte.png', ruta: '/reportes-admin'}
  ];

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.getUserData(this.userName)
    .subscribe(
      (res) => this.user = res
    );
  }

}
