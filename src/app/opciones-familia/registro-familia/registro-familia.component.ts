import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/family.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogRegistroFamiliaComponent } from 'src/app/dialog-registro-familia/dialog-registro-familia.component';

@Component({
  selector: 'app-registro-familia',
  templateUrl: './registro-familia.component.html',
  styleUrls: ['./registro-familia.component.css']
})
export class RegistroFamiliaComponent implements OnInit {
  familia;
  registroFamiliaForm: FormGroup;

  constructor(private familiaService: FamilyService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
      this.registroFamiliaForm = new FormGroup({
        'nombreFamilia': new FormControl(null, Validators.required),
        'numHijos': new FormControl(null, Validators.required),
        'descuentoFamilia': new FormControl(0, Validators.required)
      });
    }


  registrarFamilia() {
    const nombreFamilia = this.registroFamiliaForm.get('nombreFamilia').value;
    const numHijos = this.registroFamiliaForm.get('numHijos').value;
    const descuentofamilia = this.registroFamiliaForm.get('descuentoFamilia').value;
    const nuevaFamilia = {
      NOMB_FAMILIA: nombreFamilia,
      NUM_HIJOS: numHijos,
      DESC_NUM_HIJOS: descuentofamilia
    };
    this.familiaService.registrarNuevaFamilia(nuevaFamilia)
    .subscribe(
      (data) => {
        console.log(data);
        this.openDialog('1');
      },
      (err) => {
        this.openDialog('2');
      }
    );
  }

  onReturn() {
    this.router.navigate(['/opciones-familias']);
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
    this.dialog.open(DialogRegistroFamiliaComponent, dialogConfig);

  }
}
