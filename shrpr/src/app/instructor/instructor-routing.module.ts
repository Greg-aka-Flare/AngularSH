import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstructorComponent } from './instructor.component';
import { ProfileComponent } from './profile/profile.component';

const instructorRoutes: Routes = [
	{ path: '', component: InstructorComponent, children: [
		{ path: 'profile', component: ProfileComponent}
	] },
	
];

@NgModule({
	imports: [RouterModule.forChild(instructorRoutes)],
	exports: [RouterModule]
})
export class InstructorRoutingModule{ }