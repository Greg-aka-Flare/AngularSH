import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InstructorRoutingModule } from './instructor-routing.module';
import { StarRatingModule } from 'angular-star-rating';

import { InstructorComponent } from './instructor.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    InstructorComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    InstructorRoutingModule,
    StarRatingModule
  ]
})
export class InstructorModule { }
