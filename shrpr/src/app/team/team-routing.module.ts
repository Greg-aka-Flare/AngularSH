import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OurteamComponent } from './our-team/ourteam.component';
import { TeamComponent } from './team.component';
import { BrandonComponent } from './brandon/brandon.component';
import { ErikComponent } from './erik/erik.component';
import { MikeComponent } from './mike/mike.component';
import { MilesComponent } from './miles/miles.component';
import { CollinComponent } from './collin/collin.component';
import { DaveComponent } from './dave/dave.component';
import { GregoryComponent } from './gregory/gregory.component';
import { AlexaComponent } from './alexa/alexa.component';

const teamRoutes: Routes = [
	{ path: '', component: TeamComponent, children: [
		{ path: 'ourteam', component: OurteamComponent },
		{ path: 'brandon', component: BrandonComponent },
		{ path: 'erik', component: ErikComponent },
		{ path: 'mike', component: MikeComponent },
		{ path: 'miles', component: MilesComponent },
		{ path: 'collin', component: CollinComponent },
		{ path: 'dave', component: DaveComponent },
		{ path: 'gregory', component: GregoryComponent },
		{ path: 'alexa', component: AlexaComponent },
	] }
];

@NgModule({
	imports: [RouterModule.forChild(teamRoutes)],
	exports: [RouterModule]
})
export class TeamRoutingModule{ }