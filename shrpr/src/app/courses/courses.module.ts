import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseBookComponent } from './course/course-book/course-book.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSemestersComponent } from './course/course-semesters/course-semesters.component';


@NgModule({
  declarations: [
  	CourseComponent,
    CourseBookComponent,
  	CoursesComponent,
    CourseListComponent,
    CourseSemestersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    StarRatingModule,
    SharedModule,
    AgmCoreModule
  ]
})
export class CoursesModule { }
