import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { CourseProfileComponent } from './course-profile/course-profile.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';


@NgModule({
  declarations: [
    ProfileComponent,
    CourseProfileComponent,
    InstructorCourseComponent
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