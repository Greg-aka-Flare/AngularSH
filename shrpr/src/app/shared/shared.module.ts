import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Ng2CompleterModule } from 'ng2-completer';
import { StarRatingModule } from 'angular-star-rating';

import { Carousel } from './carousel/carousel.component';
import { Slide } from './carousel/slide.component';
import { SearchComponent } from './search/search.component';
import { RatingComponent } from './rating/rating.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { DatexPipe, TruncatePipe } from './date.pipe';
import { FilterComponent } from './filter/filter.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { ControlMessagesComponent } from '../shared/control-messages/control-messages.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    Carousel,
    Slide,
    SearchComponent,
    RatingComponent,
    TabsComponent,
    TabComponent,
    DatexPipe,
    TruncatePipe,
    FilterComponent,
    InlineEditComponent,
    ControlMessagesComponent,
    ModalComponent
  ],
  imports: [
  	CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    Ng2CompleterModule,
    StarRatingModule.forRoot()
  ],
  exports: [
    Carousel,
    Slide,
    SearchComponent,
    TabsComponent,
    TabComponent,
    DatexPipe,
    TruncatePipe,
    AgmCoreModule,
    FilterComponent,
    InlineEditComponent,
    RatingComponent,
    ControlMessagesComponent,
    ModalComponent
  ]
})
export class SharedModule {}