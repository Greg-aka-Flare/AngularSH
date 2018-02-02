import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileInstitutionComponent} from './profile-institution/profile-institution.component';
import { ProfileInstructorComponent} from './profile-instructor/profile-instructor.component';
import { ProfileStudentComponent} from './profile-student/profile-student.component';
import { AddCourseInstructorComponent } from './profile-instructor/add-course-instructor/add-course-instructor.component';
import { CuriosityComponent } from './curiosity/curiosity.component';

const profileRoutes: Routes = [
	{ path: ':open', component: ProfileComponent },
	{ path: '', component: ProfileComponent }

];

@NgModule({
	imports: [RouterModule.forChild(profileRoutes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule{ }