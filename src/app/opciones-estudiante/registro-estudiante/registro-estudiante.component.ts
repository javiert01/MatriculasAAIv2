import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FamilyService } from 'src/app/family.service';
import { Familia } from 'src/app/models/familia.model';
import { Subject } from 'rxjs';
import { GradoService } from 'src/app/grado.service';
import { CategoriaService } from 'src/app/categoria.service';
import { StudentService } from 'src/app/student/student.service';
import { DialogRegistroEstudianteComponent } from 'src/app/dialog-registro-estudiante/dialog-registro-estudiante.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogRegistroFamiliaComponent } from 'src/app/dialog-registro-familia/dialog-registro-familia.component';

@Component({
  selector: 'app-registro-estudiante',
  templateUrl: './registro-estudiante.component.html',
  styleUrls: ['./registro-estudiante.component.css']
})
export class RegistroEstudianteComponent implements OnInit {

  registroEstudianteForm: FormGroup;
  registroFamiliaForm: FormGroup;
  listaFamilia = [];
  listaFamiliaCopy = [];
  familyChanged = new Subject<Familia[]>();
  index;
  mostrarRegistroFamilia = false;
  familiaSeleccionada;
  listaGrados = [];
  listaCategorias = [];

  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  constructor(private familyService: FamilyService, private gradoService: GradoService,
    private categoriaService: CategoriaService, private studentService: StudentService,
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
    this.registroEstudianteForm = new FormGroup({
      'nombres': new FormControl(null, Validators.required),
      'apellidos': new FormControl(null, Validators.required),
      'codigoEst': new FormControl(null, Validators.required),
      'ayudaFinanciera': new FormControl(0, Validators.required),
      'saldoPendiente': new FormControl(0, Validators.required),
      'creditosMision': new FormControl(0, Validators.required),
      'categoriaEstudiante': new FormControl(null, Validators.required),
      'gradoEstudiante': new FormControl(null, Validators.required)
    });
    this.registroFamiliaForm = new FormGroup({
      'nombreFamilia': new FormControl(null, Validators.required),
      'numHijos': new FormControl(null, Validators.required),
      'descuentoFamilia': new FormControl(0, Validators.required)
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
    )
  }

  enviarDatosEstudiante() {
    const nuevoEstudiante = {
      CODIGO_EST: this.registroEstudianteForm.get('codigoEst').value,
      NOMBRE_EST: this.registroEstudianteForm.get('apellidos').value + ' ' + this.registroEstudianteForm.get('nombres').value,
      ALERTA: false,
      SALDO_PENDIENTE: this.registroEstudianteForm.get('saldoPendiente').value.toString(),
      DESC_AYUD_FIN: this.registroEstudianteForm.get('ayudaFinanciera').value.toString(),
      DESC_CREDITOS_MISION: this.registroEstudianteForm.get('creditosMision').value,
      ESTADO: 'PENDIENTE',
      ID_CATE: this.registroEstudianteForm.get('categoriaEstudiante').value,
      ID_FAMILIA: this.familiaSeleccionada.id,
      ID_GRADO: this.registroEstudianteForm.get('gradoEstudiante').value,
      ID_DESC_REPORTE: null,
      ID_PAGO_REPORTE: null
    };
    this.studentService.registrarEstudiante(nuevoEstudiante)
    .subscribe(
      (data) => {
        this.studentService.crearReporteDescuento(data.id)
        .subscribe(
          (data1) => console.log(data1)
        );
        this.studentService.crearReportePago(data.id)
        .subscribe(
          (data2) => console.log(data2)
        );
        this.studentService.actualizarIDReportes(data.id)
        .subscribe(
          (data3) => console.log('reportes', data3)
        );
        this.openDialog('1');
      },
      (err) => {
        console.log(err);
        this.openDialog('2');
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

  registrarFamilia() {
    const nombreFamilia = this.registroFamiliaForm.get('nombreFamilia').value;
    const numHijos = this.registroFamiliaForm.get('numHijos').value;
    const descuentofamilia = this.registroFamiliaForm.get('descuentoFamilia').value;
    const nuevaFamilia = {
      NOMB_FAMILIA: nombreFamilia,
      NUM_HIJOS: numHijos,
      DESC_NUM_HIJOS: descuentofamilia
    };
    this.familyService.registrarNuevaFamilia(nuevaFamilia)
    .subscribe(
      (data) => {
        this.familiaSeleccionada = data;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  seleccionarFamilia() {
    for (let i = 0; i < this.listaFamiliaCopy.length; i++) {
      if (this.listaFamiliaCopy[i].id === this.index) {
        this.familiaSeleccionada = this.listaFamiliaCopy[i];
      }
    }
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
    this.dialog.open(DialogRegistroEstudianteComponent, dialogConfig);
  }




}
