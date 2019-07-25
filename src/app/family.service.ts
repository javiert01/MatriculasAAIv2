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
    return this.http.get<any>(this.url);
  }
}
