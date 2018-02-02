import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./core/home/home.component";
import { AboutComponent } from './core/about/about.component';
import { ValuesComponent } from './core/values/values.component';
import { VideosComponent } from './core/videos/videos.component';
import { PodcastComponent } from './core/podcast/podcast.component';
import { InterviewwithroblabonneComponent } from './core/podcast/interviewwithroblabonne.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstitutionComponent } from './institution/institution.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './core/login/login.component';
import { TermsComponent } from './core/login/terms/terms.component';
import { PrivacyComponent } from './core/login/privacy/privacy.component';


const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'marketing', loadChildren: './marketing/marketing.module#MarketingModule' },
	{ path: 'team', loadChildren: './team/team.module#TeamModule' },
	{ path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
	{ path: 'institution/:id', loadChildren: './institution/institution.module#InstitutionModule' },
	{ path: 'instructor/:id', loadChildren: './instructor/instructor.module#InstructorModule' },
	{ path: 'student/:id', loadChildren: './student/student.module#StudentModule' },
	{ path: 'courses', loadChildren: './courses/courses.module#CoursesModule' },
	{ path: 'payment', loadChildren: './payment/payment.module#PaymentModule' },
	{ path: 'login', component: LoginComponent },
	{ path: 'terms-and-conditions', component: TermsComponent },
	{ path: 'privacy-policy', component: PrivacyComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'values', component: ValuesComponent },
	{ path: 'videos', component: VideosComponent },
	{ path: 'podcast', component: PodcastComponent },
	{ path: 'interviewwithroblabonne', component: InterviewwithroblabonneComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}