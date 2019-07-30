import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/family.service';
import { Familia } from 'src/app/models/familia.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {

  registroEstudianteForm: FormGroup;
  listaFamilia = [];
  listaFamiliaCopy = [];
  familyChanged = new Subject<Familia[]>();
  index;

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  constructor(private familyService: FamilyService) { }

  ngOnInit() {
    this.familyService.getFamilyArray()
    .subscribe(
      (data) => {
        this.listaFamilia = data;
        this.listaFamiliaCopy = this.listaFamilia.slice();
      },
      (error) => console.log(error)
    );
    this.registroEstudianteForm = new FormGroup({
      'nombres': new FormControl(null, Validators.required),
      'apellidos': new FormControl(null, Validators.required),
    });
  }

  enviarDatosEstudiante() {
  }

  getResultSearchArray() {
    this.listaFamilia.splice(0, this.listaFamilia.length);
    for (const familia of this.listaFamiliaCopy) {
      const nombre = familia.NOMB_FAMILIA;
      if (nombre.toLowerCase().includes(this.searchInput.nativeElement.value.toLowerCase())) {
        this.listaFamilia.push(familia);
      }
    }
    this.familyChanged.next(this.listaFamilia.slice());
  }

  onGetIndex(i: number) {
    this.index = i;
  }

  changeClassID(id) {
    const element = document.getElementById(id);
    element.classList.add('active');
    this.listaFamilia.forEach(servicio => {
      if (servicio.id !== id) {
        const tag = document.getElementById(servicio.id);
        tag.classList.remove('active');
      }
    });
  }





}
