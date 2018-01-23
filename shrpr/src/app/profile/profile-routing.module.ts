import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileInstitutionComponent} from './profile-institution/profile-institution.component';
import { ProfileInstructorComponent} from './profile-instructor/profile-instructor.component';
import { ProfileStudentComponent} from './profile-student/profile-student.component';
import { AddCourseInstructorComponent } from './profile-instructor/add-course-instructor/add-course-instructor.component';


const profileRoutes: Routes = [
	{ path: '', component: ProfileComponent, children: [
		{ path: '/add-course', component: AddCourseInstructorComponent }
		
	] }
];

@NgModule({
	imports: [RouterModule.forChild(profileRoutes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule{ }