import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router, Params, NavigationEnd} from '@angular/router';
import { Student } from '../student.model';
import { Familia } from '../../models/familia.model';
import { Grado } from '../../models/grado.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  students: Student[] = [];
  id: number;
  familia: any;
  idFamilia: number;

  @ViewChild('discountPension', {static: true}) discountPension: ElementRef;


  constructor(private studentService: StudentService,
              private route: ActivatedRoute,
              private router: Router) {
              }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });

    this.route.queryParams
    .map(queryParams => queryParams['familia'])
    .switchMap(familia => familia ? this.studentService.getFamily(familia) : Observable.empty())
    .subscribe(familia => {
      this.familia = familia;
      this.students.splice(0, this.students.length);
      for (const estudiante of this.familia.estudiantes) {
        this.studentService.getStudent(estudiante.id)
        .subscribe(
          (studentAux: Student) => {
            console.log(studentAux);
            this.students.push(studentAux);
          },
          (error) => console.log(error)
        );
      }
    });
    // console.log(this.students[0].DESC_AYUD_FIN);
  }

  ngOnDestroy() {
    this.students.splice(0, this.students.length);
  }

  getTotalPagoEstudiante(student: Student, planPago: number, conSaldoPendiente: boolean, conDescuentoPrepago: boolean) {
    return this.studentService.getTotalPagoEstudiante(student, planPago, conSaldoPendiente,
       true, conDescuentoPrepago, this.existeAyudaFinancieraFamilia());
  }
  getTotalPagoFamilia() {
    let total = 0;
    for (const student of this.students) {
      total = total + this.studentService.getTotalPagoEstudiante(student , 1, true , true , false, this.existeAyudaFinancieraFamilia());
    }
    return total;
  }

  existeAyudaFinancieraFamilia() {
    let bandera = false;
    for (const student of this.students) {
      if (student.DESC_AYUD_FIN !== '0') {
        bandera = true;
      }
    }
    return bandera;
  }
}
