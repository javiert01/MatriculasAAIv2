import { Injectable } from '@angular/core';
import { HOST } from './shared/var.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GradoService {
  url = `${HOST}/grado`;

  constructor(private http: HttpClient) {}

  getGrados() {
    return this.http.get<any>(this.url);
  }

  getGradoID(id) {
    return this.http.get<any>(this.url + '/' + id);
  }

  actualizarDatosGrado(id, nuevosDatos){
    return this.http.patch<any>(this.url + '/' + id, nuevosDatos);
  }
}
