import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { CourseSelectComponent } from '../core/login/course-select/course-select.component';
import { InstructorCourseComponent } from '../core/login/instructor-course/instructor-course.component';

const profileRoutes: Routes = [
	{ path: '', component: ProfileComponent, children:[
		{path: 'select-course', component: CourseSelectComponent },
		{path: 'instructor-course', component: InstructorCourseComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(profileRoutes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule{ }