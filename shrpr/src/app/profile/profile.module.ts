import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewChild, ElementRef, Renderer } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CourseSelectComponent } from '../core/login/course-select/course-select.component';
import { InstructorCourseComponent } from '../core/login/instructor-course/instructor-course.component';
import { NewCourseComponent } from './new-course/new-course.component';


@NgModule({
  declarations: [
    ProfileComponent,
    CourseSelectComponent,
    InstructorCourseComponent,
    NewCourseComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }