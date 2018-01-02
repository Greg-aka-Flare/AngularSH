import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';

@NgModule({
  declarations: [
  	CourseComponent,
  	CoursesComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoursesRoutingModule,
    StarRatingModule,
    SharedModule,
    AgmCoreModule
  ]
})
export class CoursesModule { }
