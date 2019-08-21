import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Student } from 'src/app/student/student.model';
import { Subscription, Subject } from 'rxjs';
import { StudentService } from 'src/app/student/student.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FamilyService } from 'src/app/family.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogCambioFamiliaComponent } from 'src/app/dialog-cambio-familia/dialog-cambio-familia.component';

@Component({
  selector: 'app-cambio-familia-estudiante',
  templateUrl: './cambio-familia-estudiante.component.html',
  styleUrls: ['./cambio-familia-estudiante.component.css']
})
export class CambioFamiliaEstudianteComponent implements OnInit, OnDestroy {

  students: Student[];
  studentsCopy: Student[];
  subscription: Subscription;
  index: number;
  familyIndex: number;
  loading = false;
  estudianteSeleccionado;
  verDetallesEst = false;

  loadingFamilia = false;
  indexFamilia;
  listaFamilias = [];
  listaFamiliasCopy = [];
  familiasChanged = new Subject<any[]>();
  familiaSeleccionada;
  verDetallesFam = false;

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;


  @ViewChild('searchInputFamilia', {static: true}) searchInputFamilia: ElementRef;

  constructor(private studentService: StudentService, private router: Router, private authService: AuthService
    , private vcr: ViewContainerRef, private familiaService: FamilyService, private dialog: MatDialog) {
  }

  ngOnInit() {

    this.familiasChanged.subscribe(
      (aspirantes) => {
        this.listaFamilias = aspirantes;
      }
    );

    this.familiaService.getFamilyArray()
    .subscribe((familias) => {
      this.listaFamilias = familias;
      this.listaFamiliasCopy = this.listaFamilias.slice();
      this.loadingFamilia = true;
    }, (error) =>
    console.log(error));

    this.subscription = this.studentService.studentsChanged
    .subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    );
    this.studentService.getStudentsBackend()
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.studentsCopy = this.students.slice();
        this.loading = true;
      },
      (error) => console.log(error)
    );

  }

  getResultSearchArray() {
    this.studentService.getResultSearchArray(this.searchInput.nativeElement.value);
  }


  onGetIndex(i: number) {
    console.log(i);
    this.index = i;
  }

  onGetFamilyIndex(i: number) {
    this.familyIndex = i;
  }

  onGetIndexFamilia(i: number) {
    this.indexFamilia = i;
  }

  getResultSearchArrayFamilia() {
    this.listaFamilias.splice(0, this.listaFamilias.length);
    for (const familia of this.listaFamiliasCopy) {
      if (familia.NOMB_FAMILIA.toLowerCase().includes(this.searchInputFamilia.nativeElement.value.toLowerCase())) {
        this.listaFamilias.push(familia);
      }
    }
    this.familiasChanged.next(this.listaFamilias.slice());
  }

  changeClassID(id) {
    const element = document.getElementById(id);
    element.classList.add('active');
    this.listaFamilias.forEach(familia => {
      if (familia.id !== id) {
        const tag = document.getElementById(familia.id);
        tag.classList.remove('active');
      }
    });
  }

  verInfoEstudiante(){
    this.studentService.getStudent(this.index)
    .subscribe(
      (data) => {
        this.estudianteSeleccionado = data;
        this.verDetallesEst = true;
      }
    );

  }

  verInfoFamilia() {
    this.familiaService.getFamiliaID(this.indexFamilia)
    .subscribe(
      (data) => {
        this.familiaSeleccionada = data;
        this.verDetallesFam = true;
      }
    );
  }

  cambiarFamilia() {
    const nuevaFamilia = {
      ID_FAMILIA: this.familiaSeleccionada.id
    };
    this.studentService.actualizarDatosEstudiante(this.estudianteSeleccionado.id, nuevaFamilia)
    .subscribe(
      (data) => {
       this.openDialog('1');
      },
      (err) => {
        this.openDialog('2');
      }
    )
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
    this.dialog.open(DialogCambioFamiliaComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.familiasChanged.unsubscribe();
  }

}
