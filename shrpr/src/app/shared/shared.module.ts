import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Ng2CompleterModule } from 'ng2-completer';

import { Carousel } from './carousel/carousel.component';
import { Slide } from './carousel/slide.component';
import { SearchComponent } from './search/search.component';
import { AddreviewComponent } from './add-a-review/addreview.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { DatexPipe } from './date.pipe';
import { FilterComponent } from './filter/filter.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { ControlMessagesComponent } from '../shared/control-messages/control-messages.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    Carousel,
    Slide,
    SearchComponent,
    AddreviewComponent,
    TabsComponent,
    TabComponent,
    DatexPipe,
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
    Ng2CompleterModule
  ],
  exports: [
    Carousel,
    Slide,
    SearchComponent,
    TabsComponent,
    TabComponent,
    DatexPipe,
    AgmCoreModule,
    FilterComponent,
    InlineEditComponent,
    AddreviewComponent,
    ControlMessagesComponent,
    ModalComponent
  ]
})
export class SharedModule {}