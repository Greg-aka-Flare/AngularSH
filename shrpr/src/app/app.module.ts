import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import { Ng2CompleterModule } from "ng2-completer";

import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { LikeService } from "./like.service";
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { TabsComponent } from './home/tabs/tabs.component';
import { TabComponent } from './home/tabs/tab.component';

import { TemplateHeader } from './template/template.component';
import { TemplateFooter } from './template/template.component';
import { TemplateComponent } from './template/template.component';
import { GroupsPipe } from './course/filter.pipe';


import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursedesktopComponent } from './course/coursedesktop.component';
import { CourseComponent } from './course/course.component';
import { CourseService } from "./course.service";
import { UserService } from "./user.service";
import { NewCourseComponent } from './new-course/new-course.component';
import { CoursecardComponent } from './coursecard/coursecard.component';
import { InstructorService } from "./instructor.service";
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { StudentService } from './student.service';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';
import { Angular2SocialLoginModule } from "angular2-social-login";

let providers = {
  "google": {
    "clientId": "GOOGLE_CLIENT_ID"
  },
  "linkedin": {
    "clientId": "LINKEDIN_CLIENT_ID"
  },
  "facebook": {
    "clientId": "FACEBOOK_CLIENT_ID",
    "apiVersion": "v2.4"
  }
};

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
    GroupsPipe,
    InstructorProfileComponent,
    SearchComponent,
    StudentComponent,
    CoursecardComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    routing,
    StarRatingModule.forRoot(),
    Angular2SocialLoginModule      
  ],
  providers: [CourseService, LikeService, InstructorService, StudentService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){}
}

Angular2SocialLoginModule.loadProvidersScripts(providers);
