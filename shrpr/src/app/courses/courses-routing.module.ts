import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseComponent } from './course/course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseTestComponent } from './course-test/course-test.component';

const coursesRoutes: Routes = [
	{ path: '', component: CoursesComponent, children: [
		{ path: 'list/:group', component: CourseListComponent },
		{ path: ':id', component: CourseComponent },
		{ path: 'test/:id', component: CourseTestComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(coursesRoutes)],
	exports: [RouterModule]
})
export class CoursesRoutingModule{ }