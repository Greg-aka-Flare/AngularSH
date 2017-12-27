import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./core/home/home.component";
import { AboutComponent } from './core/about/about.component';
import { ValuesComponent } from './core/values/values.component';
import { VideosComponent } from './core/videos/videos.component';
import { LandingComponent } from './core/landing/landing.component';
import { LandingGuard } from './core/landing/landing-guard.service';
import { PodcastComponent } from './core/podcast/podcast.component';
import { InterviewwithroblabonneComponent } from './core/podcast/interviewwithroblabonne.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstitutionComponent } from './institution/institution.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './core/login/login.component';

const appRoutes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'home', component: HomeComponent, canActivate: [LandingGuard] },
	{ path: 'marketing', loadChildren: './marketing/marketing.module#MarketingModule', canActivate: [LandingGuard] },
	{ path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [LandingGuard] },
	{ path: 'team', loadChildren: './team/team.module#TeamModule' },
	{ path: 'instructor/:id', loadChildren: './instructor/instructor.module#InstructorModule', canActivate: [LandingGuard] },
	{ path: 'student/:id', loadChildren: './student/student.module#StudentModule', canActivate: [LandingGuard] },
	{ path: 'courses', loadChildren: './courses/courses.module#CoursesModule', canActivate: [LandingGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [LandingGuard] },
	{ path: 'about', component: AboutComponent },
	{ path: 'values', component: ValuesComponent, canActivate: [LandingGuard] },
	{ path: 'videos', component: VideosComponent, canActivate: [LandingGuard] },
	{ path: 'podcast', component: PodcastComponent, canActivate: [LandingGuard] },
	{ path: 'interviewwithroblabonne', component: InterviewwithroblabonneComponent, canActivate: [LandingGuard] },
	{ path: 'institution/:id', loadChildren: './institution/institution.module#InstitutionModule', canActivate: [LandingGuard] }
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}