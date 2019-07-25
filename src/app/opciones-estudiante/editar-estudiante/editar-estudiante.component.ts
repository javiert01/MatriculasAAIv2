import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StudentService } from 'src/app/student/student.service';
import { Subject } from 'rxjs';
import { Student } from 'src/app/student/student.model';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.css']
})
export class EditarEstudianteComponent implements OnInit {

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  editarEstudianteForm: FormGroup;
  listaEstudiantes = [];
  listaEstudiantesCopy = [];
  index;
  estudiantesChanged = new Subject<Student[]>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentsBackend()
    .subscribe(
      (data) => {
        this.listaEstudiantes = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  enviarDatosEstudiante() {
  }

  onGetIndex(i: number) {
    this.index = i;
  }

  getResultSearchArray() {
    this.listaEstudiantes.splice(0, this.listaEstudiantes.length);
    for (const familia of this.listaEstudiantesCopy) {
      const nombre = familia.NOMB_FAMILIA;
      if (nombre.toLowerCase().includes(this.searchInput.nativeElement.value.toLowerCase())) {
        this.listaEstudiantes.push(familia);
      }
    }
    this.estudiantesChanged.next(this.listaEstudiantes.slice());
  }

  changeClassID(id) {
    const element = document.getElementById(id);
    element.classList.add('active');
    this.listaEstudiantes.forEach(servicio => {
      if (servicio.id !== id) {
        const tag = document.getElementById(servicio.id);
        tag.classList.remove('active');
      }
    });
  }



}
