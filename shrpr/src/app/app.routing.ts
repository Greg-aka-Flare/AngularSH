import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CoursesComponent } from "./courses/courses.component"
import { NewCourseComponent } from "./new-course/new-course.component"

const APP_ROUTES: Routes = [
	{ path: '', component: CoursesComponent },
	{ path: 'new-course', component: NewCourseComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);