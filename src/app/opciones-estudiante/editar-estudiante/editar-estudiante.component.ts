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


  constructor() { }

  ngOnInit() {

  }


}
