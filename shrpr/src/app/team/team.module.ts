import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TeamRoutingModule } from './team-routing.module';
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

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule
  ],
  declarations: [
    TeamComponent,
    OurteamComponent,
    BrandonComponent,
    ErikComponent,
    MikeComponent,
    MilesComponent,
    CollinComponent,
    DaveComponent,
    GregoryComponent,
    AlexaComponent,
  ]
})
export class TeamModule { }