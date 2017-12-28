import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';
import { StudentComponent } from './student.component';

@NgModule({
  declarations: [
    StudentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StudentRoutingModule,
    StarRatingModule,
    FormsModule
  ]
})
export class StudentModule { }
