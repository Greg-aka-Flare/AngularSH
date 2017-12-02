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

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'marketing', loadChildren: './marketing/marketing.module#MarketingModule' },
	{ path: 'new-course', component: NewCourseComponent },
	{ path: 'instructor/:id', component: InstructorProfileComponent },
	{ path: 'student/:id', component: StudentComponent },
	{ path: 'course/:id', component: CoursecardComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'about', component: AboutusComponent },
	{ path: 'team', component: TeamComponent },
	{ path: 'brandon', component: BrandonComponent },
	{ path: 'erick', component: ErickComponent },
	{ path: 'mike', component: MikeComponent },
	{ path: 'miles', component: MilesComponent },
	{ path: 'collin', component: CollinComponent },
	{ path: 'dave', component: DaveComponent },
	{ path: 'gregory', component: GregoryComponent },
	{ path: 'alexa', component: AlexaComponent },
	{ path: 'values', component: ValuesComponent },
	{ path: 'videos', component: VideosComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'podcast', component: PodcastComponent },
	{ path: 'interviewwithroblabonne', component: InterviewwithroblabonneComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}