import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.model';
import { Observable } from 'rxjs/Observable';
import { WINDOW } from '../window.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-pago',
  templateUrl: './reporte-pago.component.html',
  styleUrls: ['./reporte-pago.component.css']
})
export class ReportePagoComponent implements OnInit {

  students: Student[] = [];
  familia: any;
  familiaStudents: Student[] = [];
  ids = [];
  idEstudiante;
  totalEstudiantes: number;
  planPago = 1;
  cargado = 0;
  hiddenButton = false;
  escondido = true;
  fecha = new Date();
  studentsLoaded: Promise<boolean> = Promise.resolve(false);
  studentsObservable: Observable<Student>;
  observables: Observable<any>[] = [];
  data: any;
  userName = localStorage.getItem('username');
  user: User;
  totalMensaje = 'Total';
  segundoMensaje = '';
  matriculado = {'ESTADO': 'MATRICULADO'};
  procesoFinalizado = true;

  @ViewChild('content', {static: true}) content: ElementRef;

  constructor(@Inject(WINDOW) private window: Window , private studentService: StudentService,
    private route: ActivatedRoute, private router: Router, private authService: AuthService) {
     }

  ngOnInit() {
    this.students = [];
    this.authService.getUserData(this.userName)
      .subscribe(
        (response) => this.user = response
      );

    this.route.data.subscribe(
      (dataArray) => {
        for (const student of dataArray.student) {
          this.students.push(student);
        }
      }
    );

    this.studentService.getFamily(this.students[0].ID_FAMILIA.id)
    .subscribe(familia => {
      this.familia = familia;
      for (const estudiante of this.familia.estudiantes) {
        this.studentService.getStudent(estudiante.id)
        .subscribe(
          (studentAux: Student) => {
            this.familiaStudents.push(studentAux);
            // this.studentsSelected.push(studentAux);
          },
          (error) => console.log(error)
        );
      }
    });

    switch (this.students[0].ID_PAGO_REPORTE.FORMA_PAGO) {
      case 'Anual':
      this.planPago = 1;
      break;
      case 'Semestral':
      this.planPago = 2;
      this.totalMensaje = 'Total 1er Semestre';
      this.segundoMensaje = 'Total 2ndo Semestre';
      break;
      case 'Mensual':
      this.planPago = 10;
      this.totalMensaje = 'Total 1er Mes';
      this.segundoMensaje = 'Total Mensual';
      break;
      default:
      break;
    }
  }

  noExisteAyudaFinancieraEstudiante() {
    let bandera = false;
    for (const student of this.students) {
      if (student.DESC_AYUD_FIN === '0') {
        bandera = true;
      }
    }
    return bandera;
  }

  existenCreditosEstudiante() {
    let bandera = false;
    for (const student of this.students) {
      if (student.DESC_CREDITOS_MISION > 0) {
        bandera = true;
      }
    }
    return bandera;
  }

  saldoAFavorSuperaPension() {
    let bandera = false;
    for (const student of this.students) {
      if (Math.abs((student.ID_GRADO.COSTO_PENSION / this.planPago) + student.ID_GRADO.COSTO_MATRICULA) <=
      Math.abs(parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))) {
        bandera = true;
      }
    }
    return bandera;
  }

  saldoAFavorSuperaPensionEstudiante(student: Student) {
    let bandera = false;
    if (Math.abs((student.ID_GRADO.COSTO_PENSION / this.planPago) + student.ID_GRADO.COSTO_MATRICULA) <=
      Math.abs(parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))) {
        bandera = true;
      }
    return bandera;
  }

  existeSaldoPendiente() {
    let bandera = false;
    for (const student of this.students) {
      if (student.SALDO_PENDIENTE !== '0' ||  student.SALDO_PENDIENTE !== null) {
        bandera = true;
      }
    }
    return bandera;
  }

  existeDescuentoPrepago() {
    let bandera = false;
    for (const student of this.students) {
      if (student.ID_DESC_REPORTE.DESC_PREPAGO !== 0) {
        bandera = true;
      }
    }
    return bandera;
  }

  existeAyudaFinancieraFamilia() {
    let bandera = false;
    for (const student of this.familiaStudents) {
      if (student.DESC_AYUD_FIN !== '0') {
        bandera = true;
      }
    }
    return bandera;
  }

  getTotalPension() {
    let total = 0;
    for (const student of this.students) {
      total = total + (student.ID_GRADO.COSTO_PENSION / this.planPago);
    }
    return total;
  }

  getTotalMatricula() {
    let total = 0;
    for (const student of this.students) {
      total = total + student.ID_GRADO.COSTO_MATRICULA;
    }
    return total;
  }

  getSubtotalCobro() {
    let total = 0;
    for (const student of this.students) {
      total = total + (student.ID_GRADO.COSTO_MATRICULA + student.ID_GRADO.COSTO_PENSION / this.planPago);
    }
    return total;
  }

  getDescuentoEstudianteMatricula(student: Student) {
    return this.studentService.getDescuentoEstudianteMatricula(student);
  }

  getTotalDescuentoMatricula() {
    let descuentoTotal = 0;
    for (const student of this.students) {
      descuentoTotal = descuentoTotal + this.studentService.getDescuentoEstudianteMatricula(student);
    }
    return descuentoTotal;
  }

  getDescuentoEstudiantePension(student: Student) {
    return this.studentService.getDescuentoEstudiantePension(student, this.planPago, this.existeAyudaFinancieraFamilia());
  }

  getTotalDescuentoPension() {
    let descuentoTotal = 0;
    for (const student of this.students) {
      descuentoTotal = descuentoTotal + this.studentService
      .getDescuentoEstudiantePension(student, this.planPago, this.existeAyudaFinancieraFamilia());
      if (student.DESC_AYUD_FIN !== '0' && student.ID_CATE.id === 1) {
        descuentoTotal = descuentoTotal + (parseFloat(student.DESC_AYUD_FIN.replace(',', '.')) / this.planPago);
      }
    }
    return descuentoTotal;
  }

  getTotalAyudaFinanciera() {
    let suma = 0;
    for (const student of this.students) {
      suma = suma + (parseFloat(student.DESC_AYUD_FIN.replace(',', '.')) / this.planPago);
    }
    return suma;
  }

  getTotalDescuentoPrepago() {
    let suma = 0;
    for (const student of this.students) {
      suma = suma + student.ID_DESC_REPORTE.DESC_PREPAGO;
    }
    return suma;
  }

  getTotalCreditosMision() {
    let totalCreditos = 0;
    for (const student of this.students) {
      if (student.DESC_CREDITOS_MISION !== 0) {
        totalCreditos = totalCreditos + (student.DESC_CREDITOS_MISION / this.planPago);
      }
    }
    return totalCreditos;
  }

  getTotalDescuento() {
    let suma = 0;
    for (const student of this.students) {
      suma = suma + student.ID_DESC_REPORTE.TOTAL_DESCUENTO;
    }
    return suma;
  }

  getSaldoAnterior(student: Student) {
    let saldoAnterior = 0;
    saldoAnterior = saldoAnterior + (parseFloat(student.SALDO_PENDIENTE.replace(',', '.')));
    return saldoAnterior;
  }

  getTotalSaldoAnterior() {
    let totalSaldoAnt = 0;
    for (const student of this.students) {
      totalSaldoAnt = totalSaldoAnt + (parseFloat(student.SALDO_PENDIENTE.replace(',', '.')));
    }
    return totalSaldoAnt;
  }

  getTotal(matricula: boolean, saldoMayor: boolean) {
    let total = 0;
    for (const student of this.students) {
      if (this.saldoAFavorSuperaPensionEstudiante(student) && saldoMayor) {
        total = total + 0;
      } else {
        if (matricula) {
          total = total + student.ID_PAGO_REPORTE.TOTAL_PAGO - student.ID_GRADO.COSTO_MATRICULA;
        } else {
          total = total + student.ID_PAGO_REPORTE.TOTAL_PAGO;
        }
      }
    }
    return total;
  }

  getSaldoAFavorStudent(student: Student) {
    let saldo = 0;
    if (this.saldoAFavorSuperaPensionEstudiante(student)) {
      saldo = (student.ID_GRADO.COSTO_PENSION / this.planPago) + student.ID_GRADO.COSTO_MATRICULA
      + parseFloat(student.SALDO_PENDIENTE.replace(',', '.')) - ((student.ID_GRADO.COSTO_PENSION / this.planPago) * 0.03) ;
    }
    return saldo;
  }

  getTotalSaldoAFavor() {
    let total = 0;
    for (const student of this.students) {
      if (this.saldoAFavorSuperaPensionEstudiante(student)) {
        total = total + (student.ID_GRADO.COSTO_PENSION / this.planPago) + student.ID_GRADO.COSTO_MATRICULA
        + parseFloat(student.SALDO_PENDIENTE.replace(',', '.')) - ((student.ID_GRADO.COSTO_PENSION / this.planPago) * 0.03) ;
      }
    }
    return total;
  }

  get2ndoPago(student: Student) {
    let pago = 0;
    if (this.saldoAFavorSuperaPensionEstudiante(student)) {
      if (student.ID_PAGO_REPORTE.METODO_PAGO === 'Cheque o efectivo') {
        pago = (student.ID_GRADO.COSTO_PENSION / this.planPago) + this.getSaldoAFavorStudent(student)
        - ((student.ID_GRADO.COSTO_PENSION / this.planPago) * 0.03);
      } else {
        pago = (student.ID_GRADO.COSTO_PENSION / this.planPago) + this.getSaldoAFavorStudent(student);
      }
    } else {
      if (student.ID_PAGO_REPORTE.FORMA_PAGO === 'Mensual') {
        pago = (pago + (student.ID_GRADO.COSTO_PENSION + student.ID_GRADO.COSTO_MATRICULA -
          (student.ID_DESC_REPORTE.TOTAL_DESCUENTO * this.planPago) + parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))
          - student.ID_PAGO_REPORTE.TOTAL_PAGO) / 9;
      } else {
        pago = pago + (student.ID_GRADO.COSTO_PENSION + student.ID_GRADO.COSTO_MATRICULA -
          (student.ID_DESC_REPORTE.TOTAL_DESCUENTO * this.planPago) + parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))
          - student.ID_PAGO_REPORTE.TOTAL_PAGO;
      }
    }
    return pago;
  }

  getTotal2ndoPago() {
    let pago = 0;
    for (const student of this.students) {
      if (this.saldoAFavorSuperaPensionEstudiante(student)) {
        if (student.ID_PAGO_REPORTE.METODO_PAGO === 'Cheque o efectivo') {
          pago = pago + (student.ID_GRADO.COSTO_PENSION / this.planPago) + this.getSaldoAFavorStudent(student)
          - ((student.ID_GRADO.COSTO_PENSION / this.planPago) * 0.03);
        } else {
          pago = pago + (student.ID_GRADO.COSTO_PENSION / this.planPago) + this.getSaldoAFavorStudent(student);
        }
      } else {
        if (student.ID_PAGO_REPORTE.FORMA_PAGO === 'Mensual') {
          pago = (pago + (student.ID_GRADO.COSTO_PENSION + student.ID_GRADO.COSTO_MATRICULA -
            (student.ID_DESC_REPORTE.TOTAL_DESCUENTO * this.planPago) + parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))
            - student.ID_PAGO_REPORTE.TOTAL_PAGO) / 9;
        } else {
          pago = pago + (student.ID_GRADO.COSTO_PENSION + student.ID_GRADO.COSTO_MATRICULA -
            (student.ID_DESC_REPORTE.TOTAL_DESCUENTO * this.planPago) + parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))
            - student.ID_PAGO_REPORTE.TOTAL_PAGO;
        }
      }
    }
    return pago;
  }

  reducirNombre(nombreCompleto: string) {
    let nombreCompletoSeparado: string[] = [];
    let nombre = '';
    let apellido = '';
    let nombreFinal = '';

    nombreCompletoSeparado = nombreCompleto.split(' ');
    if (nombreCompletoSeparado.length === 2) {
      nombreFinal = nombreCompleto;
    } else {
      if (nombreCompletoSeparado.length === 3 || nombreCompletoSeparado.length === 4) {
        apellido = nombreCompletoSeparado[0];
        nombre = nombreCompletoSeparado[2];
        nombreFinal = apellido + ' ' + nombre;
      } else {
        apellido = nombreCompletoSeparado[0];
        nombre = nombreCompletoSeparado[nombreCompletoSeparado.length - 2];
        nombreFinal = apellido + ' ' + nombre;
      }
    }
    return nombreFinal;
  }

  onImprimirReporte() {
    this.window.print();
    this.procesoFinalizado = false;
  }

  onNavigateToInicio() {
    let studentsAux: Student[] = [];
    const content = this.content.nativeElement;
    const source = window.document.getElementById('content');
    studentsAux = this.students.slice();
    html2canvas(window.document.getElementById('content')).then(function(canvas) {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF('p');
      doc.addImage(img, 'JPEG', 1, 10, 190, 140);
      doc.save(studentsAux[0].ID_FAMILIA.NOMB_FAMILIA + ' 2019_2020.pdf');
      const specialElementHandlers = {
      '#editor': function(element, render) {
        return true;
      }
    };
      });
    for (const student of this.students) {
      this.studentService.actualizarEstadoEstudiante(student, this.matriculado)
      .subscribe(
        (val) => {
            console.log('PATCH call successful value returned in body',
                        val);
        },
        response => {
            console.log('PATCH call in error', response);
        },
        () => {
            console.log('The PATCH observable is now completed.');
        });
    }
    this.router.navigate(['/estudiantes']);
  }

  onNavigateToOpcionesPago() {
    this.router.navigate(['/opciones-pago'], { queryParams: { familia: this.students[0].ID_FAMILIA.id }});
  }

}
