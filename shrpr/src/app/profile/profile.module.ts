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
import { StarRatingModule } from 'angular-star-rating';
import { AddCourseInstructorComponent } from './profile-instructor/add-course-instructor/add-course-instructor.component';
import { AgmCoreModule } from '@agm/core';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  declarations: [
    ProfileComponent,
    CourseSelectComponent,
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
    StarRatingModule,
    AgmCoreModule,
    Ng2CompleterModule
  ]
})
export class ProfileModule { }