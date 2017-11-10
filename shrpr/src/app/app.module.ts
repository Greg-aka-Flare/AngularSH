import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import { Ng2CompleterModule } from "ng2-completer";
import { NgModel } from '@angular/forms';

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
import { MarketingComponent } from './marketing/marketing.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TeamComponent } from './team/team.component';
import { ValuesComponent } from './values/values.component';
import { VideosComponent } from './videos/videos.component';
import { BlogComponent } from './blog/blog.component';
import { PodcastComponent } from './podcast/podcast.component';
import { Carousel } from './carousel/carousel.component';
import { Slide } from './carousel/slide.component';


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
    MarketingComponent,
    AboutusComponent,
    TeamComponent,
    ValuesComponent,
    VideosComponent,
    BlogComponent,
    PodcastComponent,
    Carousel,
    Slide
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    routing,
    StarRatingModule.forRoot()
  ],
  providers: [CourseService, LikeService, InstructorService, StudentService, UserService, NgModel],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){}
}

