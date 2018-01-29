import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InstructorsRoutingModule } from './instructors-routing.module';
import { StarRatingModule } from 'angular-star-rating';

import { InstructorsComponent } from './instructors.component';
import { InstructorComponent } from './instructor/instructor.component';

@NgModule({
  declarations: [
    InstructorsComponent,
    InstructorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    InstructorsRoutingModule,
    StarRatingModule
  ]
})
export class InstructorsModule { }
