import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { routing } from "./app.routing";
import { CourseService } from "./course.service";
import { TemplateComponent } from './template/template.component';
import { TemplateHeader } from './template/template.component';
import { TemplateFooter } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    NewCourseComponent,
    MenuComponent,
    TemplateComponent,
    TemplateHeader,
    TemplateFooter
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    routing
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
