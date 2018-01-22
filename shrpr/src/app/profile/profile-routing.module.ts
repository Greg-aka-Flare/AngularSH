import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileInstitutionComponent} from './profile-institution/profile-institution.component';
import { ProfileInstructorComponent} from './profile-instructor/profile-instructor.component';
import { ProfileStudentComponent} from './profile-student/profile-student.component';
import { NewCourseComponent } from './new-course/new-course.component';

const profileRoutes: Routes = [
	{ path: '', component: ProfileComponent, children: [
		{path: ':id/new-course', component: NewCourseComponent }
	] }
];

@NgModule({
	imports: [RouterModule.forChild(profileRoutes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule{ }