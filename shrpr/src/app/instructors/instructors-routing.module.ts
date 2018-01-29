import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstructorsComponent } from './instructors.component';
import { InstructorComponent } from '../instructors/instructor/instructor.component';


const instructorsRoutes: Routes = [
	{ path: '', component: InstructorsComponent, children: [
		{ path: ':id', component: InstructorComponent }
	] },
	
];

@NgModule({
	imports: [RouterModule.forChild(instructorsRoutes)],
	exports: [RouterModule]
})
export class InstructorsRoutingModule{ }