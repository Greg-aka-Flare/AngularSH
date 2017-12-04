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
	{ path: 'team', loadChildren: './team/team.module#TeamModule', canActivate: [LandingGuard] },
	{ path: 'new-course', component: NewCourseComponent, canActivate: [LandingGuard] },
	{ path: 'instructor/:id', component: InstructorProfileComponent, canActivate: [LandingGuard] },
	{ path: 'student/:id', component: StudentComponent, canActivate: [LandingGuard] },
	{ path: 'course/:id', component: CoursecardComponent, canActivate: [LandingGuard] },
	{ path: 'login', component: LoginComponent, canActivate: [LandingGuard] },
	{ path: 'about', component: AboutusComponent, canActivate: [LandingGuard] },
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