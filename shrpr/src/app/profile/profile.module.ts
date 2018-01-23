import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewChild, ElementRef, Renderer } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileInstitutionComponent} from './profile-institution/profile-institution.component';
import { ProfileInstructorComponent} from './profile-instructor/profile-instructor.component';
import { ProfileStudentComponent} from './profile-student/profile-student.component';
import { ProfileComponent } from './profile.component';
import { CourseSelectComponent } from '../core/login/course-select/course-select.component';
import { InstructorCourseComponent } from '../core/login/instructor-course/instructor-course.component';
import { StarRatingModule } from 'angular-star-rating';
import { AddCourseInstructorComponent } from './profile-instructor/add-course-instructor/add-course-instructor.component';

@NgModule({
  declarations: [
    ProfileComponent,
    CourseSelectComponent,
    InstructorCourseComponent,
    ProfileInstitutionComponent,
    ProfileInstructorComponent,
    ProfileStudentComponent,
    AddCourseInstructorComponent
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