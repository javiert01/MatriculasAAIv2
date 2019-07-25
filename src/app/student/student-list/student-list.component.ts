import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user.model';




@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {

  students: Student[];
  studentsCopy: Student[];
  subscription: Subscription;
  index: number;
  familyIndex: number;
  loading = false;
  userName = localStorage.getItem('username');
  user: User;

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(private studentService: StudentService, private router: Router, private authService: AuthService
    , private vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.authService.getUserData(this.userName)
    .subscribe(
      (response) => this.user = response
    );

    this.subscription = this.studentService.studentsChanged
    .subscribe(
      (students: Student[]) => {
        this.students = students;
      }
    );
    this.studentService.getStudentsBackend()
    .subscribe(
      (students: any[]) => {
        this.students = students;
        this.studentsCopy = this.students.slice();
        this.loading = true;
      },
      (error) => console.log(error)
    );

  }

  getResultSearchArray() {
    this.studentService.getResultSearchArray(this.searchInput.nativeElement.value);
  }

  showAlerta(alerta: boolean) {
  }

  onGetIndex(i: number) {
    console.log(i);
    this.index = i;
  }

  onGetFamilyIndex(i: number) {
    this.familyIndex = i;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
