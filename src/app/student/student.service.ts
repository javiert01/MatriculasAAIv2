import { Injectable } from '@angular/core';
import { Student } from '../student/student.model';
import { Subject } from 'rxjs/Subject';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs/observable/from';
import { ReportePago } from '../models/reporte-pago.model';
import { ReporteDescuento } from '../models/reporte-descuento.model';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../shared/var.constant';


@Injectable()

export class StudentService {

    url = `${HOST}/estudiante`;
    url2 = `${HOST}`;
    private students: Student[] = [];
    studentsChanged = new Subject<Student[]>();
    private studentsCopy: Student[] = [];
    private studentsAux: Student[] = [];

    constructor(private http: HttpClient) {
        this.getStudentsBackend().subscribe(
            (students: any[]) =>
              this.studentsCopy = students,
            (error) => console.log(error)
          );
    }

    getStudentsBackend(): Observable<any> {
        return this.http.get(this.url + '?sort=NOMBRE_EST&limit=1000');
    }

    registrarEstudiante(nuevoEstudiante) {
      return this.http.post<any>(this.url, nuevoEstudiante);
    }

    crearReporteDescuento(id) {
      const nuevoReporte = {
        id: id,
        DESC_NUM_HIJOS: 0,
        DESC_CATE: 0,
        DESC_AYUD_FIN: 0,
        DESC_PREPAGO: 0,
        DESC_CREDITOS_MISION: 0,
        TOTAL_DESCUENTO: 0
      };
      return this.http.post<any>(this.url2 + '/reportedescuento', nuevoReporte);
    }

    crearReportePago(id) {
      const nuevoReporte = {
        id: id,
        FORMA_PAGO: '',
        METODO_PAGO: '',
        TOTAL_PAGO: 0,
        FECHA_PAGO: ''
      };
      return this.http.post<any>(this.url2 + '/reportepago', nuevoReporte);

    }

    actualizarIDReportes(id) {
      const idReportes = {
        ID_DESC_REPORTE: id,
        ID_PAGO_REPORTE: id
      };
      return this.http.patch(this.url + '/' + id, idReportes);
    }

    getStudent(index: number) {
        return this.http.get(this.url + '/' + index.toString());
    }

    getStudentDesc(): Observable<any> {
        return this.http.get(this.url + '/descuento');
    }

    getStudentByFecha(fecha: string): Observable<any> {
        return this.http.get(this.url + '/fecha/' + fecha);
    }

    getStudentByMetodoPago(metodoPago: string): Observable<any> {
        return this.http.get(this.url + '/metodopago/' + metodoPago);
    }

    getStudentByFormaPago(formaPago: string): Observable<any> {
        return this.http.get(this.url + '/formapago/' + formaPago);
    }

    getStudentAyud(): Observable<any> {
        return this.http.get(this.url + '/ayudafinanciera');
    }
    getStudentsByID(ids: number[]): Observable<any> {
        return from(ids).pipe(
           mergeMap(id => <Observable<any>> this.http.get(this.url + `/${id}`).map(
            (response) => (<Student[]>response)).share()
           ));
      }

    getFamily(index: number) {
        return this.http.get(this.url2 + '/familia/' + index.toString());
    }

    setPagoEstudiante(pagoEstudiante: ReportePago, id: number) {
        return this.http.put(this.url2 + '/reportepago/' + id, pagoEstudiante);
    }

    setDescuentoEstudiante(descuentoEstudiante: ReporteDescuento, id: number) {
        return this.http.put(this.url2 + '/reportedescuento/' + id, descuentoEstudiante);
    }

    actualizarEstadoEstudiante(student: Student, estado: any) {
        const index = student.id;
         return this.http.patch(this.url + '/' + index, estado);
    }

    actualizarSaldoPendiente(student: Student, saldoPendiente: string) {
        const index = student.id;
        const estado = {'SALDO_PENDIENTE': saldoPendiente};
        return this.http.patch(this.url + '/' + index, estado);
    }

    getTipoGrado(index: number) {
        return this.http.get(this.url2 + '/grado/' + index.toString());
    }

    getTiposGrado() {
        return this.http.get(this.url2 + '/grado');
    }

    getResultSearchArray(searchInput: string) {
        this.students.splice(0, this.students.length);
        for (const student of this.studentsCopy) {
          if (student.NOMBRE_EST.toLowerCase().includes(searchInput.toLowerCase())) {
            this.students.push(student);
          }
        }
        this.studentsChanged.next(this.students.slice());
      }

      initStudentAux() {
          this.studentsAux = [];
      }

    addOrDeleteStudent(student: Student) {
        if (this.studentsAux.includes(student)) {
            this.studentsAux.splice(this.studentsAux.indexOf(student), 1);
        } else {
            this.studentsAux.push(student);
        }
        this.studentsChanged.next(this.studentsAux.slice());
    }

    getSubtotalCobro(student: Student, planPago: number) {
        let total = 0;
          total = total + student.ID_GRADO.COSTO_MATRICULA;
          // console.log('Matricula normal' + total);
        switch (student.ID_CATE.id) {
          case 1: {
              total = total + ((student.ID_GRADO.COSTO_PENSION / planPago));
             // console.log('Pension menos descuento (normal)' + total);
            break;
          }
          case 2: {
              total = total + ((student.ID_GRADO.COSTO_PENSION / planPago));
             break;
          }
          case 3: {
            total = total + ((student.ID_GRADO.COSTO_PENSION / planPago));
            break;
          }
          case 4: {
            total = total + ((student.ID_GRADO.COSTO_PENSION / planPago));
            break;
          }
          default: {
             break;
          }
       }
       return total; // + parseFloat(student.SALDO_PENDIENTE.replace(',', '.'));
       // console.log('Saldo anterior añadido' + (total + parseFloat(student.SALDO_PENDIENTE.replace(',', '.'))));
      }


    getTotalPagoEstudiante(student: Student, planPago: number, conSaldoPendiente: boolean, conMatricula: boolean,
         conDescuentoPrepago: boolean, existeAyudaFinanciera: boolean) {
        let total = 0;
        if (conMatricula) {
            if ((student.ID_CATE.id === 2) || (student.ID_CATE.id === 3)) {
                total = total + 300;
              } else {
                total = total + student.ID_GRADO.COSTO_MATRICULA;
                // console.log('Matricula normal' + total);
              }
        }
        switch (student.ID_CATE.id) {
          case 1: {
              if (existeAyudaFinanciera) {
                if ( student.DESC_AYUD_FIN !== '0') {
                    total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) - parseFloat(student.DESC_AYUD_FIN.replace(',', '.'))
                     / planPago);
                } else {
                    total = total + (student.ID_GRADO.COSTO_PENSION / planPago);
                }
              } else {
                total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) -
                ((student.ID_FAMILIA.DESC_NUM_HIJOS / student.ID_FAMILIA.NUM_HIJOS) / planPago));
              }
              /*if ( student.DESC_AYUD_FIN !== '0') {
                  total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) - parseFloat(student.DESC_AYUD_FIN.replace(',', '.'))
                   / planPago);
              } else {
                total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) -
              ((student.ID_FAMILIA.DESC_NUM_HIJOS / student.ID_FAMILIA.NUM_HIJOS) / planPago));
              }*/
             // console.log(total);
             // console.log('Pension menos descuento (normal)' + total);
            break;
          }
          case 2: {
              if (student.ID_GRADO.id > 1) {
                total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) -
              ((student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100)));
              } else {
                total = total + ((student.ID_GRADO.COSTO_PENSION - 2850) / planPago);
              }
             break;
          }
          case 3: {
            if (student.ID_GRADO.id > 1) {
                total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) -
              ((student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100)));
              } else {
                total = total + ((student.ID_GRADO.COSTO_PENSION - 2850) / planPago);
              }
            break;
          }
          case 4: {
              if (student.DESC_AYUD_FIN === '0') {
                total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) -
                ((student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100)));
              } else {
                total = total + ((student.ID_GRADO.COSTO_PENSION / planPago) -
                ((student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100)))
                - (parseFloat(student.DESC_AYUD_FIN.replace(',', '.')) / planPago);
              }
            break;
          }
          default: {
             break;
          }
       }

       if (student.DESC_CREDITOS_MISION !== 0) {
           total = total - (student.DESC_CREDITOS_MISION / planPago);
       }
       if (conSaldoPendiente) {
        if (conSaldoPendiente && student.SALDO_PENDIENTE.includes('-')) {
            total = total + (parseFloat(student.SALDO_PENDIENTE.replace(',', '.')));
         } else if (conSaldoPendiente && !student.SALDO_PENDIENTE.includes('-')) {
             total = total + (parseFloat(student.SALDO_PENDIENTE.replace(',', '.')));
         }
       }
       if (conDescuentoPrepago) {
           switch (planPago) {
               case 1: {
                total = total - (student.ID_GRADO.COSTO_PENSION * 5) / 100;
                break;
               }
               case 2: {
                total = total - ((student.ID_GRADO.COSTO_PENSION / planPago)  * 3) / 100;
                break;
               }
               default: {
                   break;
               }
           }
       }
       return total;
       // console.log('Saldo anterior añadido' + (total + parseFloat(student.SALDO_PENDIENTE.replace(',', '.'))));
      }

      getDescuentoEstudiantePension(student: Student, planPago: number, existeAyudaFinanciera: boolean) {
          let descuento = 0;
        switch (student.ID_CATE.id) {
            case 1: {
                if (existeAyudaFinanciera) {
                    descuento = 0;
                } else if (student.ID_FAMILIA.NUM_HIJOS > 1 && student.DESC_AYUD_FIN === '0') {
                    descuento = ((student.ID_FAMILIA.DESC_NUM_HIJOS / student.ID_FAMILIA.NUM_HIJOS) / planPago);
                    }
                /* if ( student.DESC_AYUD_FIN === null) {
                    descuento = ((student.ID_FAMILIA.DESC_NUM_HIJOS / student.ID_FAMILIA.NUM_HIJOS) / planPago);
                } else {
                    descuento = (parseFloat(student.DESC_AYUD_FIN.replace(',', '.')) / planPago);
                }
               // console.log('Pension menos descuento (normal)' + total);*/
              break;
            }
            case 2: {
                if (student.ID_GRADO.id > 1) {
                    descuento = (student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100);
                } else {
                    descuento = 2850 / planPago;
                }
               break;
            }
            case 3: {
                if (student.ID_GRADO.id > 1) {
                    descuento = (student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100);
                } else {
                    descuento = 2850 / planPago;
                }
              break;
            }
            case 4: {
                descuento = (student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100);
                /*if (student.DESC_AYUD_FIN === null) {
                  } else {
                    descuento = (student.ID_GRADO.COSTO_PENSION / planPago) * (student.ID_CATE.DESC_CATE / 100)
                    + parseFloat(student.DESC_AYUD_FIN.replace(',', '.'));
                  }
              break;*/
              break;
            }
            default: {
               break;
            }
        }
        return descuento;
      }

      getDescuentoEstudianteMatricula(student: Student) {
        return student.ID_GRADO.COSTO_MATRICULA - 300;
    }

    getTotalDescuentoEstudiante(student: Student, planPago: number, prepagoSeleccionado: boolean, existeAyudaFinanciera: boolean) {
        let total = 0;
        if ((student.ID_CATE.id === 2) || (student.ID_CATE.id === 3)) {
            total = this.getDescuentoEstudianteMatricula(student);
        }
        if (student.ID_CATE.id === 1 && student.DESC_AYUD_FIN === '0' && prepagoSeleccionado) {
            switch (planPago) {
                case 1: {
                 total = total + (student.ID_GRADO.COSTO_PENSION * 5) / 100;
                 break;
                }
                case 2: {
                 total = total + ((student.ID_GRADO.COSTO_PENSION / planPago)  * 3) / 100;
                 break;
                }
                default: {
                    break;
                }
            }
        }
        if (student.DESC_AYUD_FIN !== '0') {
            total = total + (parseFloat(student.DESC_AYUD_FIN.replace(',', '.')) / planPago);
        }
        if (student.DESC_CREDITOS_MISION !== 0) {
            total = total + (student.DESC_CREDITOS_MISION / planPago);
        }
        total = total + this.getDescuentoEstudiantePension(student, planPago, existeAyudaFinanciera);
        return total;
    }

}
