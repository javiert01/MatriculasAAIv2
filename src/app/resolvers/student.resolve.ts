import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { StudentService } from '../student/student.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class StudentResolve implements Resolve<any> {
    ids: number[] = [];
    total = 0;
 constructor(private  studentService: StudentService) {}
 resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
       ): Observable<any> {
        const observables: Observable<any>[] = [];
        this.total = route.queryParams['total'];
        this.ids = [];
        for (let i = 0; i < this.total; i++) {
          console.log('estudiante' + i);
          this.ids.push(route.queryParams['estudiante' + (i + 1)]);
        }
        for (let i = 0; i < this.ids.length ; i++) {
          console.log('Id estudiante' + this.ids[i]);
          observables.push(this.studentService.getStudent(this.ids[i]));
        }
    // console.log(this.studentService.getStudentsByID(this.ids));
    // return this.studentService.getStudentsByID(this.ids);
    return Observable.forkJoin(observables);
  }
}
