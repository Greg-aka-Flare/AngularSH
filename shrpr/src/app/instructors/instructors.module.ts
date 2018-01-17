import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InstructorsRoutingModule } from './instructors-routing.module';
import { StarRatingModule } from 'angular-star-rating';

import { InstructorsComponent } from './instructors.component';
import { InstructorComponent } from './instructor/instructor.component';
import { AddCourseComponent } from './add-course/add-course.component';


@NgModule({
  declarations: [
    InstructorsComponent,
    InstructorComponent,
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    InstructorsRoutingModule,
    StarRatingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InstructorsModule { }
