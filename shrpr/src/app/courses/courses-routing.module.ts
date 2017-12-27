import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSelectComponent } from './course-select/course-select.component';

const coursesRoutes: Routes = [
	{ path: '', component: CoursesComponent, children: [
		{ path: 'list/:group', component: CourseListComponent },
		{ path: ':id', component: CourseComponent },
		{ path: 'course-select', component: CourseSelectComponent }
	] }
];


@NgModule({
	imports: [RouterModule.forChild(coursesRoutes)],
	exports: [RouterModule]
})
export class CoursesRoutingModule{ }