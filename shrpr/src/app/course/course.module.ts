import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';

@NgModule({
  declarations: [
  	CourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CourseRoutingModule,
    StarRatingModule,
    SharedModule,
    AgmCoreModule
  ]
})
export class CourseModule { }
