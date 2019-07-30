import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones-categoria-lista',
  templateUrl: './opciones-categoria-lista.component.html',
  styleUrls: ['./opciones-categoria-lista.component.css']
})
export class OpcionesCategoriaListaComponent implements OnInit {

  categorias;
  loading = false;
  index;
  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.categoriaService.getCategorias()
    .subscribe(
      (data) => {
        this.categorias = data;
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
