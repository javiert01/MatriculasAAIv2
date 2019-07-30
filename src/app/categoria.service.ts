import { Injectable } from '@angular/core';
import { HOST } from './shared/var.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {
  url = `${HOST}/categoria`;

  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get<any>(this.url);
  }

  getCategoriaID(id) {
    return this.http.get<any>(this.url + '/' + id);
  }

  actualizarDatosCategoria(id, nuevosDatos) {
    return this.http.patch<any>(this.url + '/' + id, nuevosDatos);
  }
}
