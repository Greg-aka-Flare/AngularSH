import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseComponent } from './course.component';

const courseRoutes: Routes = [
	{ path: '', component: CourseComponent }
];

@NgModule({
	imports: [RouterModule.forChild(courseRoutes)],
	exports: [RouterModule]
})
export class CourseRoutingModule{ }