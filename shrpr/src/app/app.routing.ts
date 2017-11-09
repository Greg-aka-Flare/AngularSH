import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { CoursesComponent } from "./courses/courses.component";
import { NewCourseComponent } from "./new-course/new-course.component";
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { StudentComponent } from './student/student.component';
import { CoursecardComponent } from './coursecard/coursecard.component';
import { LoginComponent } from './login/login.component';
import { MarketingComponent } from './marketing/marketing.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TeamComponent } from './team/team.component';
import { ValuesComponent } from './values/values.component';
import { VideosComponent } from './videos/videos.component';
import { BlogComponent } from './blog/blog.component';
import { PodcastComponent } from './podcast/podcast.component';

const APP_ROUTES: Routes = [
	//{ path: '', component: CoursesComponent },
	{ path: '', component: HomeComponent },
	{ path: 'new-course', component: NewCourseComponent },
	{ path: 'instructor/:id', component: InstructorProfileComponent },
	{ path: 'student/:id', component: StudentComponent },
	{ path: 'course/:id', component: CoursecardComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'marketing', component: MarketingComponent },
	{ path: 'about', component: AboutusComponent },
	{ path: 'team', component: TeamComponent },
	{ path: 'values', component: ValuesComponent },
	{ path: 'videos', component: VideosComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'podcast', component: PodcastComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);