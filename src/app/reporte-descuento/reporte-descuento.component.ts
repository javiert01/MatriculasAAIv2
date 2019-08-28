import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.model';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-reporte-descuento',
  templateUrl: './reporte-descuento.component.html',
  styleUrls: ['./reporte-descuento.component.css']
})
export class ReporteDescuentoComponent implements OnInit {

  students: Student[];
  studentsCopy: Student[];
  metodosPago = ['Cheque o efectivo', 'Tarjeta de Credito', 'Pago por Internet ', 'Débito Bancario ', 'Otros'];
  cantidadMetodosPago = [0, 0 , 0 , 0 , 0];
  formasPago = ['Anual', 'Semestral', 'Mensual'];
  cantidadFormasPago = [0 , 0 , 0];
  estados = ['PENDIENTE', 'MATRICULADO'];
  cantidadEstados = [0, 0];
  descuento = ['SIN DESCUENTO', 'CON DESCUENTO'];
  cantidadDescuento = [0 , 0];
  ayudaFinanciera = ['CON AYUDA FINANCIERA', 'SIN AYUDA FINANCIERA'];
  cantidadAyudaFinanciera = [0, 0];
  categorias = ['Normal', 'Profesores', 'Staff', 'Ministerio'];
  cantidadCategorias = [0, 0, 0, 0];
  chart: any;
  tipo = 'bar';
  subscription: Subscription;
  index: number;
  loading = false;
  mensaje = 'Ninguna opción seleccionada';
  fechaForm: FormGroup;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentsBackend()
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.studentsCopy = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );

    this.fechaForm = new FormGroup({
      'fechaReporte': new FormControl(null)
    });
  }

  onGetStudentAyud() {
    if (this.chart) {
      this.chart.destroy();
    }
    for (let i = 0; i < this.studentsCopy.length; i++) {
      if (this.studentsCopy[i].ID_DESC_REPORTE.DESC_AYUDA_FIN > 0) {
        this.cantidadAyudaFinanciera[0]++;
      } else {
        this.cantidadAyudaFinanciera[1]++;
      }
    }
    this.dibujar(this.ayudaFinanciera, this.cantidadAyudaFinanciera);
    this.mensaje = 'Estudiantes por ayuda financiera';
  }

  onGetStudentCategoria() {
    if (this.chart) {
      this.chart.destroy();
    }
    for (let i = 0; i < this.studentsCopy.length; i++) {
      switch (this.studentsCopy[i].ID_CATE.TIPO_CATE) {
        case this.categorias[0]:
          this.cantidadCategorias[0]++;
          break;
        case this.categorias[1]:
          this.cantidadCategorias[1]++;
          break;
        case this.categorias[2]:
          this.cantidadCategorias[2]++;
          break;
        case this.categorias[3]:
          this.cantidadCategorias[3]++;
          break;
        default:
          break;
      }
    }
    this.dibujar(this.categorias, this.cantidadCategorias);
    this.mensaje = 'Estudiantes por categoria';
  }
  onGetStudentDesc() {
    if (this.chart) {
      this.chart.destroy();
    }
    for (let i = 0; i < this.studentsCopy.length; i++) {
      if (this.studentsCopy[i].ID_DESC_REPORTE.TOTAL_DESCUENTO > 0) {
        this.cantidadDescuento[1]++;
      } else {
        this.cantidadDescuento[0]++;
      }
    }
    this.dibujar(this.descuento, this.cantidadDescuento);
    this.mensaje = 'Estudiantes por descuento ';
  }

  onGetStudentEstado(){
    if (this.chart) {
      this.chart.destroy();
    }
    for (let i = 0; i < this.studentsCopy.length; i++) {
      if (this.studentsCopy[i].ESTADO === 'PENDIENTE') {
        this.cantidadEstados[0]++;
      } else {
        this.cantidadEstados[1]++;
      }
    }
    this.dibujar(this.estados, this.cantidadEstados);
    this.mensaje = 'Estudiantes por estado ';
  }

  onGetStudentMetodoPago() {
    if (this.chart) {
      this.chart.destroy();
    }
    for (let i = 0; i < this.studentsCopy.length; i++) {
      switch (this.studentsCopy[i].ID_PAGO_REPORTE.METODO_PAGO) {
        case this.metodosPago[0]:
          this.cantidadMetodosPago[0]++;
          break;
        case this.metodosPago[1]:
          this.cantidadMetodosPago[1]++;
          break;
        case this.metodosPago[2]:
          this.cantidadMetodosPago[2]++;
          break;
        case this.metodosPago[3]:
          this.cantidadMetodosPago[3]++;
          break;
        default:
          this.cantidadMetodosPago[4]++;
          break;
      }
    }
    this.dibujar(this.metodosPago, this.cantidadMetodosPago);
    this.mensaje = 'Estudiantes por método de pago';
    // this.loading = false;
    /*this.studentService.getStudentByMetodoPago(metodoPago)
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );*/
  }

  onGetStudentFormaPago() {
    if (this.chart) {
      this.chart.destroy();
    }
    for (let i = 0; i < this.studentsCopy.length; i++) {
      switch (this.studentsCopy[i].ID_PAGO_REPORTE.FORMA_PAGO) {
        case this.formasPago[0]:
          this.cantidadFormasPago[0]++;
          break;
        case this.formasPago[1]:
          this.cantidadFormasPago[1]++;
          break;
        case this.formasPago[2]:
          this.cantidadFormasPago[2]++;
          break;
        default:
          break;
      }
    }
    this.dibujar(this.formasPago, this.cantidadFormasPago);
    this.mensaje = 'Estudiantes por forma de pago: ';
  }

  onSubmitFecha() {
    this.mensaje = 'Estudiantes matriculados el: ' + this.fechaForm.get('fechaReporte').value;
    this.loading = false;
    this.studentService.getStudentByFecha(this.fechaForm.get('fechaReporte').value)
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );
    console.log(this.fechaForm);
  }


  dibujar(_labels, _data) {
      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: _labels,
          datasets: [
            {
              label: 'Cantidad',
              data: _data,
              borderColor: '#3cba9f',
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
            }],
            yAxes: [{
              display: true,
              ticks: {
                suggestedMin: 0,
            }
            }],
          }
        }
      });
  }


  cambiar(tipo: string, _labels, _data) {
    this.tipo = tipo;
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar(_labels, _data);
  }

  add(accumulator, a) {
    return accumulator + a;
  }



}
