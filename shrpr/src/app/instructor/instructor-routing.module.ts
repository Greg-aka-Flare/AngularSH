import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstructorComponent } from './instructor.component';


const instructorRoutes: Routes = [
	{ path: '', component: InstructorComponent, children: [
		
	] },
	
];

@NgModule({
	imports: [RouterModule.forChild(instructorRoutes)],
	exports: [RouterModule]
})
export class InstructorRoutingModule{ }