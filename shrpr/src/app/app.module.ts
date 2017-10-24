import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseComponent } from './course/course.component';
import { CoursedesktopComponent } from './course/coursedesktop.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { routing } from "./app.routing";
import { CourseService } from "./course.service";
import { TemplateComponent } from './template/template.component';
import { TemplateHeader } from './template/template.component';
import { TemplateFooter } from './template/template.component';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from './home/tabs/tabs.component';
import { TabComponent } from './home/tabs/tab.component';
import {GroupsPipe} from './course/filter.pipe';
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseComponent,
    CoursedesktopComponent,
    NewCourseComponent,
    MenuComponent,
    TemplateComponent,
    TemplateHeader,
    TemplateFooter,
    HomeComponent,
    TabsComponent,
    TabComponent,
    GroupsPipe
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    Ng2CompleterModule,
    routing    
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
