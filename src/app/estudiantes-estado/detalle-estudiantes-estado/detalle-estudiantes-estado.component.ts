import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Student } from 'src/app/student/student.model';
import { StudentService } from 'src/app/student/student.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-estudiantes-estado',
  templateUrl: './detalle-estudiantes-estado.component.html',
  styleUrls: ['./detalle-estudiantes-estado.component.css']
})
export class DetalleEstudiantesEstadoComponent implements OnInit, OnDestroy {

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

