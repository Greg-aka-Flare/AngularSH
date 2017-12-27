import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { CourseProfileComponent } from './course-profile/course-profile.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';

const profileRoutes: Routes = [
	{ path: '', component: ProfileComponent, children: [
		{ path: 'course-select', component: CourseProfileComponent },
		{ path: 'instructor-course', component: InstructorCourseComponent }
		
	] }
];

@NgModule({
	imports: [RouterModule.forChild(profileRoutes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule{ }