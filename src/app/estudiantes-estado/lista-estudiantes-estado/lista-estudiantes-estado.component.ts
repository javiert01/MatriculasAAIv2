import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Student } from 'src/app/student/student.model';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { StudentService } from 'src/app/student/student.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-lista-estudiantes-estado',
  templateUrl: './lista-estudiantes-estado.component.html',
  styleUrls: ['./lista-estudiantes-estado.component.css']
})
export class ListaEstudiantesEstadoComponent implements OnInit, OnDestroy {
  students: Student[];
  studentsCopy: Student[];
  subscription: Subscription;
  index: number;
  familyIndex: number;
  loading = false;
  userName = localStorage.getItem('username');
  user: User;
  estado = 'TODOS';
  mensaje = 'Mostrando todos los estudiantes:';

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(private studentService: StudentService, private router: Router, private authService: AuthService
    , private vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.authService.getUserData(this.userName)
    .subscribe(
      (response) => this.user = response
    );

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
    this.studentService.getResultSearchArray(this.searchInput.nativeElement.value, this.estado);
  }

  showAlerta(alerta: boolean) {
  }

  onGetIndex(i: number) {
    console.log(i);
    this.index = i;
  }

  onGetFamilyIndex(i: number) {
    this.familyIndex = i;
  }

  onGetStudentEstado(estado){
    if (estado === 'TODOS'){
      this.mensaje = 'Mostrando todos los estudiantes:';
    } else {
      this.mensaje = 'Mostrando los estudiantes con estado: ' + estado;
    }
    this.estado = estado;
    this.studentService.getStudentsEstado(estado);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
