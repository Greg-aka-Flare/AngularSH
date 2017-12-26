import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { StarRatingModule } from 'angular-star-rating';
import { CuriousComponent } from './curious/curious.component';
import { CuriousDesktopComponent } from './curious/curious-desktop/curious-desktop.component';
import { CuriousMobileComponent } from './curious/curious-mobile/curious-mobile.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ValuesComponent } from './values/values.component';
import { VideosComponent } from './videos/videos.component';
import { PodcastComponent } from './podcast/podcast.component';
import { InterviewwithroblabonneComponent } from './podcast/interviewwithroblabonne.component';
import { LoginComponent } from './login/login.component';
import {GoogleSigninComponent} from './login/google/google.component';
import {FacebookLoginComponent} from './login/facebook/facebook.component';
import {LinkedinComponent} from './login/linkedin/linkedin.component';

import { StudentService } from '../student/student.service';
import { AuthService } from '../auth/auth.service';
import { InstructorService } from '../instructor/instructor.service';
import { InstitutionService } from "../institution/institution.service";
import { CourseService } from '../courses/course.service';
import { LikeService } from './like.service';
import { UserService } from './user.service';
import { LandingGuard } from './landing/landing-guard.service';
import { CourseProfileComponent } from '../core/curious/course-profile/course-profile.component';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    CuriousComponent,
    CuriousDesktopComponent,
    CuriousMobileComponent,
    AboutComponent,
    ValuesComponent,
    VideosComponent,
    PodcastComponent,
    InterviewwithroblabonneComponent,
    LoginComponent,
    GoogleSigninComponent,
    FacebookLoginComponent,
    LinkedinComponent,
    CourseProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    SharedModule
  ],
  providers: [
    AuthService,
    StudentService,
    InstructorService,
    InstitutionService,
    CourseService,
    LikeService,
    UserService,
    LandingGuard
  ]
})
export class CoreModule { }