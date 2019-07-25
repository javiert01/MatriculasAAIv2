import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        StudentComponent,
        StudentListComponent,
        StudentDetailComponent
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatProgressBarModule,
        StudentRoutingModule,
        SharedModule
    ]
})
export class StudentModule { }


