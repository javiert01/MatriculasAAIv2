import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogEditarCategoriaComponent } from 'src/app/dialog-editar-categoria/dialog-editar-categoria.component';

@Component({
  selector: 'app-opciones-categoria-detalle',
  templateUrl: './opciones-categoria-detalle.component.html',
  styleUrls: ['./opciones-categoria-detalle.component.css']
})
export class OpcionesCategoriaDetalleComponent implements OnInit {

  categoria;
  categoriaForm: FormGroup;

  constructor(private categoriaService: CategoriaService, private route: ActivatedRoute,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
    .pipe(map(params => params['id']))
    // tslint:disable-next-line: deprecation
    .switchMap(id => id ? this.categoriaService.getCategoriaID(id) : Observable.empty())
    .subscribe(categoria => {
      this.categoria = categoria;
      this.categoriaForm = new FormGroup({
        'tipoCategoria': new FormControl(this.categoria.TIPO_CATE, Validators.required),
        'descuentoCategoria': new FormControl(this.categoria.DESC_CATE, Validators.required)
      });
    });
  }

  actualizarDatos() {
    const tipoCategoria = this.categoriaForm.get('tipoCategoria').value;
    const descuentoCategoria = this.categoriaForm.get('descuentoCategoria').value;
    const nuevosDatos = {
      TIPO_CATE: tipoCategoria,
      DESC_CATE: descuentoCategoria
    };
    this.categoriaService.actualizarDatosCategoria(this.categoria.id, nuevosDatos)
    .subscribe(
      (data) => {
        this.openDialog('1');
      },
      (err) => {
        this.openDialog('2');
      }
    );
  }

  onReturn() {
    this.router.navigate(['/opciones-categorias']);
  }

  openDialog(respuesta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      mensaje: respuesta
    };
    this.dialog.open(DialogEditarCategoriaComponent, dialogConfig);

  }
}
