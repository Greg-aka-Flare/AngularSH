import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InstitutionRoutingModule } from './institution-routing.module';
import { StarRatingModule } from 'angular-star-rating';

import { InstitutionComponent } from './institution.component';

@NgModule({
  declarations: [
    InstitutionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    InstitutionRoutingModule,
    StarRatingModule
  ]
})
export class InstitutionModule { }
