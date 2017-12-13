import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstitutionComponent } from './institution.component';

const institutionRoutes: Routes = [
	{ path: '', component: InstitutionComponent }
];

@NgModule({
	imports: [RouterModule.forChild(institutionRoutes)],
	exports: [RouterModule]
})
export class InstitutionRoutingModule{ }