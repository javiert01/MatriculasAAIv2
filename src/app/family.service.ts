import { Injectable } from '@angular/core';
import { HOST } from './shared/var.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FamilyService {
  url = `${HOST}/familia`;

  constructor(private http: HttpClient) {}

  getFamilyArray() {
    return this.http.get<any>(this.url + '?sort=NOMB_FAMILIA&limit=1000');
  }

  registrarNuevaFamilia(familia) {
    return this.http.post<any>(this.url, familia);
  }

  getFamiliaID(id) {
    return this.http.get<any>(this.url + '/' + id);
  }

  actualizarDatosFamilia(id, nuevosDatos) {
    return this.http.patch<any>(this.url + '/' + id, nuevosDatos);
  }
}
