import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstructorsComponent } from './instructors.component';
import { InstructorComponent } from '../instructors/instructor/instructor.component';
import { AddCourseComponent } from '../instructors/add-course/add-course.component';



const instructorsRoutes: Routes = [
	{ path: '', component: InstructorsComponent, children: [
		{ path: ':id', component: InstructorComponent },
		{ path: ':id/add-course', component: AddCourseComponent }
	] },
	
];

@NgModule({
	imports: [RouterModule.forChild(instructorsRoutes)],
	exports: [RouterModule]
})
export class InstructorsRoutingModule{ }