import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { StarRatingModule } from 'angular-star-rating';

import { CoursesComponent } from './courses.component';

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CoursesRoutingModule,
    StarRatingModule
  ]
})
export class CoursesModule { }
