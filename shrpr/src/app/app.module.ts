import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from 'angular-star-rating';
import { Ng2CompleterModule } from "ng2-completer";
import { NgModel } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
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
import { AboutusComponent } from './aboutus/aboutus.component';
import { TeamComponent } from './team/team.component';
import { BrandonComponent } from './team/brandon.component';
import { ErickComponent } from './team/erick.component';
import { MikeComponent } from './team/mike.component';
import { MilesComponent } from './team/miles.component';
import { CollinComponent } from './team/collin.component';
import { DaveComponent } from './team/dave.component';
import { GregoryComponent } from './team/gregory.component';
import { AlexaComponent } from './team/alexa.component';
import { ValuesComponent } from './values/values.component';
import { VideosComponent } from './videos/videos.component';
import { BlogComponent } from './blog/blog.component';
import { PodcastComponent } from './podcast/podcast.component';
import { InterviewwithroblabonneComponent } from './podcast/interviewwithroblabonne.component';

import { AuthService } from './auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { DatexPipe } from './date.pipe';
import { CategoryService } from "./category.service";

import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    LoginComponent,
    AboutusComponent,
    TeamComponent,
    ValuesComponent,
    VideosComponent,
    BlogComponent,
    PodcastComponent,
    InterviewwithroblabonneComponent,
    BrandonComponent,
    ErickComponent,
    MikeComponent,
    MilesComponent,
    CollinComponent,
    DaveComponent,
    GregoryComponent,
    AlexaComponent,
    DatexPipe
   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api', 'http://shrpr.dev', 'http://localhost:4200']
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBKUrP69jyLxcicvoZg05Ysqi3rbj1U1Uk'
    }),
    SharedModule
  ],
  providers: [
      AuthService, 
      CategoryService, 
      CourseService, 
      LikeService, 
      InstructorService, 
      StudentService, 
      UserService, 
      NgModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}