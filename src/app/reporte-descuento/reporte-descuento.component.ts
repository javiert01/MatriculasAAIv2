import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student/student.service';
import { Student } from '../student/student.model';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reporte-descuento',
  templateUrl: './reporte-descuento.component.html',
  styleUrls: ['./reporte-descuento.component.css']
})
export class ReporteDescuentoComponent implements OnInit {

  students: Student[];
  subscription: Subscription;
  index: number;
  loading = false;
  mensaje = 'Todos los estudiantes';
  fechaForm: FormGroup;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentsBackend()
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );

    this.fechaForm = new FormGroup({
      'fechaReporte': new FormControl(null)
    });
  }

  onGetStudentAyud() {
    this.loading = false;
    this.mensaje = 'Estudiantes con ayuda financiera';
    this.studentService.getStudentAyud()
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );
  }
  onGetStudentDesc() {
    this.mensaje = 'Estudiantes con descuento ';
    this.loading = false;
    this.studentService.getStudentDesc()
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );
  }

  onGetStudentMetodoPago(metodoPago: string) {
    this.mensaje = 'Estudiantes con el método de pago: ' + metodoPago;
    this.loading = false;
    this.studentService.getStudentByMetodoPago(metodoPago)
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );
  }

  onGetStudentFormaPago(formaPago: string) {
    this.mensaje = 'Estudiantes con la forma de pago: ' + formaPago;
    this.loading = false;
    this.studentService.getStudentByFormaPago(formaPago)
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.loading = true;
      },
      (error) => console.log(error)
    );
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



}
