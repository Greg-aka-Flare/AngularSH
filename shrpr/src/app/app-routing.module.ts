import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { CoursesComponent } from "./courses/courses.component";
import { NewCourseComponent } from "./new-course/new-course.component";
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { StudentComponent } from './student/student.component';
import { CoursecardComponent } from './coursecard/coursecard.component';
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

import { LandingComponent } from './landing/landing.component';
import { LandingGuard } from './landing/landing-guard.service';

const appRoutes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'home', component: HomeComponent, canActivate: [LandingGuard] },
	{ path: 'marketing', loadChildren: './marketing/marketing.module#MarketingModule', canActivate: [LandingGuard] },
	{ path: 'new-course', component: NewCourseComponent, canActivate: [LandingGuard] },
	{ path: 'instructor/:id', component: InstructorProfileComponent, canActivate: [LandingGuard] },
	{ path: 'student/:id', component: StudentComponent, canActivate: [LandingGuard] },
	{ path: 'course/:id', component: CoursecardComponent, canActivate: [LandingGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [LandingGuard] },
	{ path: 'about', component: AboutusComponent, canActivate: [LandingGuard] },
	{ path: 'team', component: TeamComponent, canActivate: [LandingGuard] },
	{ path: 'brandon', component: BrandonComponent, canActivate: [LandingGuard] },
	{ path: 'erick', component: ErickComponent, canActivate: [LandingGuard] },
	{ path: 'mike', component: MikeComponent, canActivate: [LandingGuard] },
	{ path: 'miles', component: MilesComponent, canActivate: [LandingGuard] },
	{ path: 'collin', component: CollinComponent, canActivate: [LandingGuard] },
	{ path: 'dave', component: DaveComponent, canActivate: [LandingGuard] },
	{ path: 'gregory', component: GregoryComponent, canActivate: [LandingGuard] },
	{ path: 'alexa', component: AlexaComponent, canActivate: [LandingGuard] },
	{ path: 'values', component: ValuesComponent, canActivate: [LandingGuard] },
	{ path: 'videos', component: VideosComponent, canActivate: [LandingGuard] },
	{ path: 'blog', component: BlogComponent, canActivate: [LandingGuard] },
	{ path: 'podcast', component: PodcastComponent, canActivate: [LandingGuard] },
	{ path: 'interviewwithroblabonne', component: InterviewwithroblabonneComponent, canActivate: [LandingGuard] }
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}