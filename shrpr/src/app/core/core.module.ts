import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { TemplateComponent } from './template/template.component';
import { TemplateHeader } from './template/template.component';
import { TemplateFooter } from './template/template.component';
import { MenuComponent } from './template/menu/menu.component';
import { DemoComponent } from './template/schedule-demo/demo.component';
import { AppRoutingModule } from '../app-routing.module';
import { StarRatingModule } from 'angular-star-rating';
import { CuriousComponent } from './curious/curious.component';
import { CuriousDesktopComponent } from './curious/curious-desktop/curious-desktop.component';
import { CuriousMobileComponent } from './curious/curious-mobile/curious-mobile.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ValuesComponent } from './values/values.component';
import { VideosComponent } from './videos/videos.component';
import { PodcastComponent } from './podcast/podcast.component';
import { InterviewwithroblabonneComponent } from './podcast/interviewwithroblabonne.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignUpFormComponent } from './login/sign-up-form/sign-up-form.component';
import { GoogleSigninComponent } from './login/google/google.component';
import { FacebookLoginComponent } from './login/facebook/facebook.component';
import { LinkedinComponent } from './login/linkedin/linkedin.component';
import { TermsComponent } from './login/terms/terms.component';
import { PrivacyComponent } from './login/privacy/privacy.component';

import { AuthService } from '@app/auth';
import { CartService } from '../payment/cart.service';
import { 
    CategoryService, 
    CourseService, 
    CuriousService,
    InstitutionService,
    InstructorService, 
    RatingService, 
    StudentService,
    TemplateService,
    UserService, 
    ValidationService 
} from '@app/core';

@NgModule({
  declarations: [
    TemplateComponent,
    TemplateHeader,
    TemplateFooter,
    MenuComponent,
    DemoComponent,
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
    LoginFormComponent,
    SignUpFormComponent,
    GoogleSigninComponent,
    FacebookLoginComponent,
    LinkedinComponent,
    TermsComponent,
    PrivacyComponent
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
  exports: [
    TemplateComponent
  ],
  providers: [
    TemplateService,
    AuthService,
    CartService,
    CategoryService,
    CourseService,
    CuriousService,
    InstructorService,
    InstitutionService,
    RatingService,
    StudentService,
    UserService,
    ValidationService
  ]
})
export class CoreModule { }