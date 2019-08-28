import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { Student } from 'src/app/student/student.model';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/student/student.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-eliminar-lista-estudiante',
  templateUrl: './eliminar-lista-estudiante.component.html',
  styleUrls: ['./eliminar-lista-estudiante.component.css']
})
export class EliminarListaEstudianteComponent implements OnInit, OnDestroy {

  students: Student[];
  studentsCopy: Student[];
  subscription: Subscription;
  index: number;
  familyIndex: number;
  loading = false;

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(private studentService: StudentService, private router: Router, private authService: AuthService
    , private vcr: ViewContainerRef) {
  }

  ngOnInit() {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
