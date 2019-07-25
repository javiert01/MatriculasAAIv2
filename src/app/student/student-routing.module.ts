import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentComponent } from './student.component';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule } from '@angular/router';

const studentRoutes: Routes = [
    { path: 'estudiantes', canActivate: [AuthGuard], component: StudentComponent, children: [
        { path: ':id', component: StudentDetailComponent}
    ] },
];
@NgModule({
    imports: [
        RouterModule.forChild(studentRoutes)
    ],
    exports: [RouterModule]
})

export class StudentRoutingModule {}

