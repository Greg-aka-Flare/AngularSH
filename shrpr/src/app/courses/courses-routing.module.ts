import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseSemestersComponent } from './course/course-semesters/course-semesters.component';
import { CourseListComponent } from './course-list/course-list.component';


const coursesRoutes: Routes = [
	{ path: '', component: CoursesComponent, children: [
		{ path: ':id/semesters', component: CourseSemestersComponent },
		{ path: 'list/:group', component: CourseListComponent },
		{ path: ':id', component: CourseComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(coursesRoutes)],
	exports: [RouterModule]
})
export class CoursesRoutingModule{ }