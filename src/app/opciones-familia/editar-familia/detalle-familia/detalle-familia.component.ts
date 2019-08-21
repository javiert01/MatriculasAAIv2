import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyService } from 'src/app/family.service';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogEditarFamiliaComponent } from 'src/app/dialog-editar-familia/dialog-editar-familia.component';
import { StudentService } from 'src/app/student/student.service';

@Component({
  selector: 'app-detalle-familia',
  templateUrl: './detalle-familia.component.html',
  styleUrls: ['./detalle-familia.component.css']
})
export class DetalleFamiliaComponent implements OnInit, OnDestroy {
  familia;
  id;
  editarFamiliaForm: FormGroup;
  students = [];

  constructor(private route: ActivatedRoute, private familyService: FamilyService
    , private router: Router, private dialog: MatDialog, private studentService: StudentService) { }

  ngOnInit() {
    this.route.params
    .pipe(map(params => params['id']))
    .pipe(switchMap(id => id ? this.familyService.getFamiliaID(id) : EMPTY))
    .subscribe(familia => {
      this.familia = familia;
      this.id = familia.id;
      this.editarFamiliaForm = new FormGroup({
        'nombreFamilia': new FormControl(familia.NOMB_FAMILIA, Validators.required),
        'numHijos': new FormControl(familia.NUM_HIJOS, Validators.required),
        'descuentoFamilia': new FormControl(familia.DESC_NUM_HIJOS, Validators.required)
      });
      for (const estudiante of this.familia.estudiantes) {
        this.studentService.getStudent(estudiante.id)
        .subscribe(
          (studentAux) => {
            console.log(studentAux);
            this.students.push(studentAux);
          },
          (error) => console.log(error)
        );
      }
    });
  }

  actualizarDatos() {
    const nuevosDatos = {
      NOMB_FAMILIA: this.editarFamiliaForm.get('nombreFamilia').value,
      NUM_HIJOS: this.editarFamiliaForm.get('numHijos').value,
      DESC_NUM_HIJOS: this.editarFamiliaForm.get('descuentoFamilia').value
    };
    this.familyService.actualizarDatosFamilia(this.familia.id, nuevosDatos)
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
    this.dialog.open(DialogEditarFamiliaComponent, dialogConfig);

  }

  eliminarEst(id) {
    
  }

  ngOnDestroy() {
    this.students.splice(0, this.students.length);
  }


}
