import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstructorComponent } from './instructor.component';

const instructorRoutes: Routes = [
	{ path: ':slug', component: InstructorComponent },
	{ path: '', component: InstructorComponent }
];

@NgModule({
	imports: [RouterModule.forChild(instructorRoutes)],
	exports: [RouterModule]
})
export class InstructorRoutingModule{ }