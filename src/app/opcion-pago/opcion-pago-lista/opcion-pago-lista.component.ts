import { Component, OnInit, OnDestroy, OnChanges, Inject, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { StudentService } from '../../student/student.service';
import { Student } from '../../student/student.model';
import { Familia } from '../../models/familia.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportePago } from '../../models/reporte-pago.model';
import { map } from 'rxjs/operator/map';
import { ReporteDescuento } from '../../models/reporte-descuento.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogOpcionPagoComponent } from 'src/app/dialog-opcion-pago/dialog-opcion-pago.component';
import { DialogSaldoPendienteComponent } from 'src/app/dialog-saldo-pendiente/dialog-saldo-pendiente.component';


@Component({
  selector: 'app-opcion-pago-lista',
  templateUrl: './opcion-pago-lista.component.html',
  styleUrls: ['./opcion-pago-lista.component.css']
})
export class OpcionPagoListaComponent implements OnInit, OnDestroy, OnChanges {
  students: Student[] = [];
  id: number;
  familia: any;
  idFamilia: number;
  studentsSelected: Student[] = [];
  subscription: Subscription;
  existeSaldoPendiente = false;
  opcionPagoSaldoPendiente: FormGroup;
  metodoFormaPago: FormGroup;
  opciones = ['Cancelar el saldo pendiente', 'Añadir saldo pendiente a pago actual'];
  seleccionado = true;
  bandera = true;
  saldoPendienteSeleccionado = true;
  bloqueado = false;
  puedePrepago = false;
  aprobadoSemestralMensual = false;
  userName = localStorage.getItem('username');
  user: User;
  masOpciones = true;
  valorInputOtros = '';
  otrosClicked = false;

  @ViewChild('content', {static: true}) content: ElementRef;

  constructor(private studentService: StudentService,
  private route: ActivatedRoute, private router: Router, private authService: AuthService,
  private dialog: MatDialog) { }

  ngOnChanges() {
    this.studentsSelected = [];
    console.log('changes' + this.studentsSelected);
  }

  ngOnInit() {

    this.authService.getUserData(this.userName)
    .subscribe(
      (response: User) => {
        this.user = response;
      }
    );

    this.studentsSelected = [];
    this.studentService.initStudentAux();
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
            this.students.push(studentAux);
            // this.studentsSelected.push(studentAux);
          },
          (error) => console.log(error)
        );
      }
    });

    this.subscription = this.studentService.studentsChanged
    .subscribe(
      (students: Student[]) => {
        this.studentsSelected = [];
        this.studentsSelected = students;
      }
    );

    this.opcionPagoSaldoPendiente = new FormGroup({
      'opcion': new FormControl(null)
    });

    this.metodoFormaPago = new FormGroup({
      'formaPago': new FormControl('Anual'),
      'metodoPagoAnual': new FormControl(null, null, this.controlPagoAnual.bind(this) ),
      'valorOtrosAnual': new FormControl({value: null, disabled: 'true'}),
      'metodoPagoSemestral': new FormControl({value: null, disabled: 'true'}, null, this.controlPagoSemestral.bind(this)),
      'valorOtrosSemestral': new FormControl({value: null, disabled: 'true'}),
      'metodoPagoMensual': new FormControl({value: null, disabled: 'true'}, null, this.controlPagoMensual.bind(this)),
      'valorOtrosMensual': new FormControl({value: null, disabled: 'true'})
    });

    this.metodoFormaPago.get('formaPago').valueChanges.subscribe(
      (value) => {
        switch (value) {
          case 'Anual':
          this.metodoFormaPago.get('metodoPagoAnual').enable();
          this.metodoFormaPago.get('metodoPagoMensual').disable();
          this.metodoFormaPago.get('metodoPagoSemestral').disable();
          break;
          case 'Semestral':
          this.metodoFormaPago.get('metodoPagoSemestral').enable();
          this.metodoFormaPago.get('metodoPagoMensual').disable();
          this.metodoFormaPago.get('metodoPagoAnual').disable();
          break;
          case 'Mensual':
          this.metodoFormaPago.controls['metodoPagoMensual'].enable();
          this.metodoFormaPago.controls['metodoPagoAnual'].disable();
          this.metodoFormaPago.controls['metodoPagoSemestral'].disable();
          break;
          default:
          break;
        }
      }
    );

    this.metodoFormaPago.get('metodoPagoAnual').valueChanges.subscribe(
      (valueOtros) => {
        if (valueOtros === 'Otros') {
          this.metodoFormaPago.get('valorOtrosAnual').enable();
        } else {
          this.metodoFormaPago.get('valorOtrosAnual').disable();
        }
      });

    this.metodoFormaPago.get('metodoPagoSemestral').valueChanges.subscribe(
        (valueOtros) => {
          if (valueOtros === 'Otros') {
            this.metodoFormaPago.get('valorOtrosSemestral').enable();
          } else {
            this.metodoFormaPago.get('valorOtrosSemestral').disable();
          }
        });

    this.metodoFormaPago.get('metodoPagoMensual').valueChanges.subscribe(
          (valueOtros) => {
            if (valueOtros === 'Otros') {
              this.metodoFormaPago.get('valorOtrosMensual').enable();
            } else {
              this.metodoFormaPago.get('valorOtrosMensual').disable();
            }
          });
  }

  controlPagoAnual(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const value = this.metodoFormaPago.get('formaPago').value;
      if (value === 'Anual') {
        if (control.value !== null) {
          resolve(null);
        } else {
          resolve({'controlPagoAnualInvalido': true});
        }
      }
    });
    return promise;
  }

  controlPagoSemestral(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const value = this.metodoFormaPago.get('formaPago').value;
      if (value === 'Semestral') {
        if (control.value !== null) {
          resolve(null);
        } else {
          resolve({'controlPagoSemestralInvalido': true});
        }
      }
    });
    return promise;
  }

  controlPagoMensual(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      const value = this.metodoFormaPago.get('formaPago').value;
      if (value === 'Mensual') {
        if (control.value !== null) {
          resolve(null);
        } else {
          resolve({'controlPagoMensualInvalido': true});
        }
      }
    });
    return promise;
  }


  aprobarPagoSemestralMensual() {
    this.aprobadoSemestralMensual = true;
  }
  onAddorDeleteStudent(student: Student) {
    this.studentService.addOrDeleteStudent(student);
  }

  saldoAFavorSuperaPensionEstudiante(student: Student) {
    let bandera = false;
      if (Math.abs(this.getTotalEstudiante(student, 2, true, false, false)) <=
      Math.abs(parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))) {
        bandera = true;
      }
    return bandera;
  }

  saldoAFavorSuperaPension() {
    let bandera = false;
    for (const student of this.studentsSelected) {
      if (Math.abs(this.getTotalEstudiante(student, 2, true, false, false)) <=
      Math.abs(parseFloat(student.SALDO_PENDIENTE.replace(',', '.')))) {
        bandera = true;
      }
    }
    return bandera;
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

  noExisteAyudaFinancieraEstudiante() {
    let bandera = false;
    for (const student of this.studentsSelected) {
      if (student.DESC_AYUD_FIN === '0') {
        bandera = true;
      }
    }
    return bandera;
  }

  existenCreditosFamilia() {
    let bandera = false;
    for (const student of this.students) {
      if (student.DESC_CREDITOS_MISION > 0) {
        bandera = true;
      }
    }
    return bandera;
  }

  existenCreditosEstudiante() {
    let bandera = false;
    for (const student of this.studentsSelected) {
      if (student.DESC_CREDITOS_MISION > 0) {
        bandera = true;
      }
    }
    return bandera;
  }

  getTotalAyudaFinanciera(planPago: number) {
    let suma = 0;
    for (const student of this.studentsSelected) {
      suma = suma + (parseFloat(student.DESC_AYUD_FIN.replace(',', '.')) / planPago);
    }
    return suma;
  }

  getTotalMatricula() {
    let suma = 0;
    for (const student of this.studentsSelected) {
      suma = suma + student.ID_GRADO.COSTO_MATRICULA;
    }
    return suma;
  }

  getTotalPension() {
    let suma = 0;
    for (const student of this.studentsSelected) {
      suma = suma + student.ID_GRADO.COSTO_PENSION;
    }
    return suma;
  }

  getSubTotalCobro(planPago: number) {
    let suma = 0;
    for (const student of this.studentsSelected) {
      suma = suma + this.studentService.getSubtotalCobro(student, planPago);
    }
    return suma;
  }

  getTotalEstudiante(student: Student, planPago: number, conMatricula: boolean, conPrepago: boolean, saldoP: boolean) {
    const conSaldoP = saldoP && this.saldoPendienteSeleccionado;
    if (student.ID_CATE.id === 1 && student.DESC_AYUD_FIN === '0') {
      this.puedePrepago = true;
    } else {
      this.puedePrepago = false;
    }
    if (this.puedePrepago) {
      return this.studentService.getTotalPagoEstudiante(student, planPago, conSaldoP, conMatricula,
        conPrepago, this.existeAyudaFinancieraFamilia());
    } else {
      return this.studentService.getTotalPagoEstudiante(student, planPago, conSaldoP, conMatricula,
        false, this.existeAyudaFinancieraFamilia());
    }
  }

  getTotal(planPago: number, conMatricula: boolean, conPrepago: boolean, saldoP: boolean, saldoMayor: boolean ) {
    let total = 0;
    const conSaldoP = saldoP && this.saldoPendienteSeleccionado;
    for (const student of this.studentsSelected) {
      if (this.saldoAFavorSuperaPensionEstudiante(student) && saldoMayor) {
        total = total + 0;
      } else {
        if (student.ID_CATE.id === 1 && student.DESC_AYUD_FIN === '0') {
          this.puedePrepago = true;
        } else {
          this.puedePrepago = false;
        }
        if (this.puedePrepago) {
          total = total + this.studentService.getTotalPagoEstudiante(student, planPago, conSaldoP, conMatricula,
            conPrepago, this.existeAyudaFinancieraFamilia());
        } else {
          total = total + this.studentService.getTotalPagoEstudiante(student, planPago, conSaldoP, conMatricula,
            false, this.existeAyudaFinancieraFamilia());
        }
      }
    }
    return total;
  }

  hasSaldoPendiente() {
    this.existeSaldoPendiente = true;
    for (const student of this.studentsSelected) {
      if (parseFloat(student.SALDO_PENDIENTE) > 0) {
        this.existeSaldoPendiente = false;
      }
    }
    return this.existeSaldoPendiente;

  }

  getDescuentoEstudiantePension(student: Student, planPago: number) {
    return this.studentService.getDescuentoEstudiantePension(student, planPago, this.existeAyudaFinancieraFamilia());
  }

  getTotalDescuentoPension(planPago: number) {
    let descuentoTotal = 0;
    for (const student of this.studentsSelected) {
      descuentoTotal = descuentoTotal + this.studentService
      .getDescuentoEstudiantePension(student, planPago, this.existeAyudaFinancieraFamilia());
      if (student.DESC_AYUD_FIN !== '0' && student.ID_CATE.id === 1) {
        descuentoTotal = descuentoTotal + (parseFloat(student.DESC_AYUD_FIN.replace(',', '.')) / planPago);
      }
    }
    return descuentoTotal;
  }

  getTotalDescuentoMatricula() {
    let descuentoTotal = 0;
    for (const student of this.studentsSelected) {
      descuentoTotal = descuentoTotal + this.studentService.getDescuentoEstudianteMatricula(student);
    }
    return descuentoTotal;
  }

  getTotalDescuento(planPago: number) {
    let total = 0;
    for (const student of this.studentsSelected) {
      total = total + this.studentService.getTotalDescuentoEstudiante(student, planPago, true, this.existeAyudaFinancieraFamilia());
    }
    return total;
  }

  getDescuentoEstudianteTotal(student: Student, planPago) {
    return this.studentService.getTotalDescuentoEstudiante(student, planPago, true, this.existeAyudaFinancieraFamilia());
  }

  getDescuentoEstudianteMatricula(student: Student) {
    return this.studentService.getDescuentoEstudianteMatricula(student);
  }

  getSaldoAnterior(student: Student) {
    let saldoAnterior = 0;
    saldoAnterior = saldoAnterior + parseFloat(student.SALDO_PENDIENTE.replace(',', '.'));
    return saldoAnterior;
  }

  getTotalSaldoAnterior() {
    let totalSaldoAnt = 0;
    for (const student of this.studentsSelected) {
      totalSaldoAnt = totalSaldoAnt + parseFloat(student.SALDO_PENDIENTE.replace(',', '.'));
    }
    return totalSaldoAnt;
  }
  getTotalDescuentoPrepago(descuento: number) {
    let totalDescuentoPrepago = 0;
    for (const student of this.studentsSelected) {
      if (student.DESC_AYUD_FIN === '0') {
        if ( descuento === 5) {
          totalDescuentoPrepago = totalDescuentoPrepago + (student.ID_GRADO.COSTO_PENSION * descuento) / 100;
        } else {
          totalDescuentoPrepago = totalDescuentoPrepago + ((student.ID_GRADO.COSTO_PENSION * descuento) / 100) / 2;
        }
      }
    }
    return totalDescuentoPrepago;
  }

  getTotalCreditosMision(planPago: number) {
    let totalCreditos = 0;
    for (const student of this.studentsSelected) {
      if (student.DESC_CREDITOS_MISION !== 0) {
        totalCreditos = totalCreditos + (student.DESC_CREDITOS_MISION / planPago);
      }
    }
    return totalCreditos;
  }

  getSubstringMetodoPago(): string {
    if (this.metodoFormaPago.get('formaPago').value !== null) {
      if (this.metodoFormaPago.get('metodoPago' + this.metodoFormaPago.get('formaPago').value).value !== null) {
        if (this.metodoFormaPago.get('metodoPago' + this.metodoFormaPago.get('formaPago').value).value.startsWith('T', 0)) {
          return 'Tarjeta de Credito';
          } else if ((this.metodoFormaPago.get('metodoPago' + this.metodoFormaPago.get('formaPago').value).value.startsWith('E', 0))) {
            return 'Cheque o efectivo';
          } else {
            return this.metodoFormaPago.get('metodoPago' + this.metodoFormaPago.get('formaPago').value).value
            + ' ' + this.valorInputOtros;
          }
        }
      } else {
        return '';
      }
  }

  ngOnDestroy() {
    this.studentsSelected = [];
    this.subscription.unsubscribe();
  }

  onSubmit() {
    console.log('popup shows');
  }

  onNavigateToReportePago() {
    let planPago = 0;
    let descPrepagoValor = 0;
    let saldoPendiente = true;
    let descuentoPrepago = false;
    for (const student of this.studentsSelected) {
      const reportePago = new ReportePago;
      const reporteDescuento = new ReporteDescuento;
      reportePago.id = student.id;
      reporteDescuento.id = student.id;
      reporteDescuento.DESC_CATE = student.ID_GRADO.COSTO_PENSION * (student.ID_CATE.DESC_CATE / 100);
      if (student.DESC_AYUD_FIN !== '0') {
        reporteDescuento.DESC_AYUDA_FIN = parseFloat(student.DESC_AYUD_FIN.replace('.', ','));
      } else {
        reporteDescuento.DESC_AYUDA_FIN = 0;
      }
      if (student.DESC_CREDITOS_MISION !== 0) {
        reporteDescuento.DESC_CREDITOS_MISION = student.DESC_CREDITOS_MISION;
      } else {
        reporteDescuento.DESC_CREDITOS_MISION = 0;
      }

      const fechaActual = new Date();
      const dia = (fechaActual.getDate() < 10 ? '0' : '') + (fechaActual.getDate());
      const mes = (fechaActual.getMonth() < 10 ? '0' : '') + (fechaActual.getMonth() + 1) ;
      const año = fechaActual.getFullYear();
      const fechaFinal = año + '-' + mes + '-' + dia;
      console.log(fechaFinal);
      reportePago.FECHA_PAGO = fechaFinal;

      reportePago.FORMA_PAGO = this.metodoFormaPago.get('formaPago').value + '';
      // reportePago.METODO_PAGO = this.metodoFormaPago.get('metodoPago' + this.metodoFormaPago.get('formaPago').value).value + '';
      reportePago.METODO_PAGO = this.getSubstringMetodoPago();
      switch (this.metodoFormaPago.get('formaPago').value) {
        case 'Anual':
        planPago = 1;
        descPrepagoValor = (student.ID_GRADO.COSTO_PENSION) * 5 / 100;
        break;
        case 'Semestral':
        planPago = 2;
        descPrepagoValor = (student.ID_GRADO.COSTO_PENSION / 2) * 3 / 100;
        break;
        case 'Mensual':
        planPago = 10;
        descPrepagoValor = 0;
        break;
        default:
        break;
      }

      if ( student.ID_CATE.id === 1 && student.DESC_AYUD_FIN !== '0' ) {
        reporteDescuento.DESC_NUM_HIJOS = 0;
      } else {
        if ( student.ID_CATE.id === 1) {
          reporteDescuento.DESC_NUM_HIJOS = ((student.ID_FAMILIA.DESC_NUM_HIJOS) / student.ID_FAMILIA.NUM_HIJOS) / planPago;
        } else {
          reporteDescuento.DESC_NUM_HIJOS = 0;
        }
      }

      if (!this.saldoPendienteSeleccionado) {
        saldoPendiente = false;
      }

      if (student.ID_CATE.id === 1 && student.DESC_AYUD_FIN === '0' && this.getSubstringMetodoPago() === 'Cheque o efectivo') {
        descuentoPrepago = true;
        reporteDescuento.DESC_PREPAGO = descPrepagoValor;
      } else {
        descuentoPrepago = false;
        reporteDescuento.DESC_PREPAGO = 0;
      }

      reporteDescuento.TOTAL_DESCUENTO = this.studentService
      .getTotalDescuentoEstudiante(student, planPago, descuentoPrepago, this.existeAyudaFinancieraFamilia());
      reportePago.TOTAL_PAGO = this.studentService.
      getTotalPagoEstudiante(student, planPago, saldoPendiente, true, descuentoPrepago, this.existeAyudaFinancieraFamilia());
      this.studentService.setPagoEstudiante(reportePago, student.id)
      .subscribe(
        (response) => {
        console.log(response);
      });
      this.studentService.setDescuentoEstudiante(reporteDescuento, student.id)
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
    }
    const queryStudents = {
    };
    this.studentsSelected.forEach(function (student, i) {
      queryStudents['estudiante' + (i + 1)] = student.id;
    });
    queryStudents['total'] = this.studentsSelected.length;
    setTimeout(
      () => {
        this.router.navigate(['/reporte-pago'], {queryParams: queryStudents});
      }
    , 1000);
  }

  onNavigateToInicio() {
    this.studentsSelected = [];
    this.router.navigate(['/estudiantes']);
  }

  onConfirmPopup() {
    this.seleccionado = false;
    this.bandera = false;
    if (this.opcionPagoSaldoPendiente.value.opcion === 'Cancelar el saldo pendiente') {
      this.saldoPendienteSeleccionado = false;
      console.log('patch');
      for (const student of this.studentsSelected) {
        this.studentService.actualizarSaldoPendiente(student, '0')
        .subscribe(
          (response) => console.log(response)
        );
      }
    } else {
      this.saldoPendienteSeleccionado = true;
    }
    this.opcionPagoSaldoPendiente.disable();
    this.bloqueado = true;

  }


  printThis() {
    let studentsAux: Student[] = [];
    const content = this.content.nativeElement;
    const source = window.document.getElementById('content');
    studentsAux = this.students.slice();
    html2canvas(window.document.getElementById('content')).then(function(canvas) {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF('l');
      doc.addImage(img, 'JPEG', 10, 10, 210, 190);
      doc.save('Informacion de pagos de ' + studentsAux[0].ID_FAMILIA.NOMB_FAMILIA + ' 2018_2019.pdf');
      const specialElementHandlers = {
      '#editor': function(element, render) {
        return true;
      }
    };
      });
  }

  transformtoNumber(str: string) {
    return Number(str);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      formaPago: this.metodoFormaPago.value.formaPago,
      metodoPago: this.getSubstringMetodoPago()
    };
    const dialogRef = this.dialog.open(DialogOpcionPagoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'aceptar') {
          this.onNavigateToReportePago();
        }
      }
    );
  }

  openDialogSaldoPendiente() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      opcion: this.opcionPagoSaldoPendiente.value.opcion
    };
    const dialogRef = this.dialog.open(DialogSaldoPendienteComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data === 'aceptar') {
          this.onConfirmPopup();
        }
      }
  );
  }
}
