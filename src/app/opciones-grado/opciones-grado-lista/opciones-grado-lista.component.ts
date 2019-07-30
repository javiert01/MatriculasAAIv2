import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GradoService } from 'src/app/grado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-grado-lista',
  templateUrl: './opciones-grado-lista.component.html',
  styleUrls: ['./opciones-grado-lista.component.css']
})
export class OpcionesGradoListaComponent implements OnInit {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  grados;
  loading = false;
  index;
  constructor(private gradoService: GradoService, private router: Router) { }

  ngOnInit() {
    this.gradoService.getGrados()
    .subscribe(
      (data) => {
        this.grados = data;
        this.loading = true;
      },
      (err) => console.log(err)
    );
  }

  onGetIndex(i: number) {
    console.log(i);
    this.index = i;
  }

  returnToAdmin() {
    this.router.navigate(['admin-page']);
  }

}
