import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentService } from 'src/app/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GradoService } from 'src/app/grado.service';
import { CategoriaService } from 'src/app/categoria.service';
import { Observable, Subject, EMPTY } from 'rxjs';
import { FamilyService } from 'src/app/family.service';
import { Familia } from 'src/app/models/familia.model';
import { map, switchMap } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogEditarEstudianteComponent } from 'src/app/dialog-editar-estudiante/dialog-editar-estudiante.component';


@Component({
  selector: 'app-editar-estudiante-detalle',
  templateUrl: './editar-estudiante-detalle.component.html',
  styleUrls: ['./editar-estudiante-detalle.component.css']
})
export class EditarEstudianteDetalleComponent implements OnInit {

  editarEstudianteForm: FormGroup;
  editarFamiliaForm: FormGroup;
  estudiante;
  listaGrados = [];
  listaCategorias = [];
  listaFamilia = [];
  listaFamiliaCopy = [];
  familia;
  id;
  familyChanged = new Subject<Familia[]>();
  familiaSeleccionada;
  index;

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  constructor(private studentService: StudentService, private route: ActivatedRoute,
    private categoriaService: CategoriaService, private gradoService: GradoService,
    private familyService: FamilyService, private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.familyService.getFamilyArray()
    .subscribe(
      (data) => {
        this.listaFamilia = data;
        this.listaFamiliaCopy = this.listaFamilia.slice();
      },
      (error) => console.log(error)
    );

    this.route.params
    .map(params => params['id'])
    .switchMap(estudiante => estudiante ? this.studentService.getStudent(estudiante) : Observable.empty())
    .subscribe(estudiante => {
      this.editarEstudianteForm = new FormGroup({
        'nombres': new FormControl(estudiante.NOMBRE_EST),
        'estado': new FormControl(estudiante.ESTADO),
        'codigoEst': new FormControl(estudiante.CODIGO_EST),
        'ayudaFinanciera': new FormControl(estudiante.DESC_AYUD_FIN),
        'saldoPendiente': new FormControl(estudiante.SALDO_PENDIENTE),
        'creditosMision': new FormControl(estudiante.DESC_CREDITOS_MISION),
        'categoriaEstudiante': new FormControl(estudiante.ID_CATE.id),
        'gradoEstudiante': new FormControl(estudiante.ID_GRADO.id)
      });
      this.estudiante = estudiante;
    });

    this.route.queryParams
    .pipe(map(params => params['familia']))
    .pipe(switchMap(id => id ? this.familyService.getFamiliaID(id) : EMPTY))
    .subscribe(familia => {
      this.familia = familia;
      this.id = familia.id;
      this.editarFamiliaForm = new FormGroup({
        'nombreFamilia': new FormControl(familia.NOMB_FAMILIA, Validators.required),
        'numHijos': new FormControl(familia.NUM_HIJOS, Validators.required),
        'descuentoFamilia': new FormControl(familia.DESC_NUM_HIJOS, Validators.required)
      });
    });

    this.categoriaService.getCategorias()
    .subscribe(
      (data) => {
        this.listaCategorias = data;
      }
    );
    this.gradoService.getGrados()
    .subscribe(
      (data) => {
        this.listaGrados = data;
      }
    );

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

  seleccionarFamilia() {
    for (let i = 0; i < this.listaFamiliaCopy.length; i++) {
      if (this.listaFamiliaCopy[i].id === this.index) {
        this.familiaSeleccionada = this.listaFamiliaCopy[i];
      }
    }
  }

  enviarDatosEstudiante() {
    const nuevosDatos = {
      NOMB_FAMILIA: this.editarFamiliaForm.get('nombreFamilia').value,
      NUM_HIJOS: this.editarFamiliaForm.get('numHijos').value,
      DESC_NUM_HIJOS: this.editarFamiliaForm.get('descuentoFamilia').value
    };

    const nuevoEstudiante = {
      CODIGO_EST: this.editarEstudianteForm.get('codigoEst').value,
      NOMBRE_EST: this.editarEstudianteForm.get('nombres').value,
      ESTADO: this.editarEstudianteForm.get('estado').value,
      SALDO_PENDIENTE: this.editarEstudianteForm.get('saldoPendiente').value.toString(),
      DESC_AYUD_FIN: this.editarEstudianteForm.get('ayudaFinanciera').value.toString(),
      DESC_CREDITOS_MISION: this.editarEstudianteForm.get('creditosMision').value,
      ID_CATE: this.editarEstudianteForm.get('categoriaEstudiante').value,
      ID_GRADO: this.editarEstudianteForm.get('gradoEstudiante').value,
    };

    this.familyService.actualizarDatosFamilia(this.familia.id, nuevosDatos)
    .subscribe(
      (data) => {
        this.studentService.actualizarDatosEstudiante(this.estudiante.id, nuevoEstudiante)
    .subscribe(
      (data) => {
        this.openDialog('1');
      },
      (err) => {
        this.openDialog('2');
      }
      );
      },
      (err) => {
        // this.openDialog('2');
      }
    );


  }
  openDialog(respuesta) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      mensaje: respuesta
    };
    this.dialog.open(DialogEditarEstudianteComponent, dialogConfig);
  }
}
