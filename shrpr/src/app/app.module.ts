import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { routing } from "./app.routing";
import { CourseService } from "./course.service";

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    NewCourseComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
