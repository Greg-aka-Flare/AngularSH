import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewChild, ElementRef, Renderer } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StarRatingModule } from 'angular-star-rating';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileInstitutionComponent } from './profile-institution/profile-institution.component';
import { ProfileInstructorComponent } from './profile-instructor/profile-instructor.component';
import { AddCourseComponent } from './profile-instructor/add-course/add-course.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInstitutionComponent,
    ProfileInstructorComponent,
    ProfileStudentComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule
  ]
})
export class ProfileModule { }