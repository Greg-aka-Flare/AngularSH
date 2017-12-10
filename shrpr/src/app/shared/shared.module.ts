import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Ng2CompleterModule } from 'ng2-completer';

import { Carousel } from './carousel/carousel.component';
import { Slide } from './carousel/slide.component';
import { TemplateComponent } from './template/template.component';
import { TemplateHeader } from './template/template.component';
import { TemplateFooter } from './template/template.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { DemoComponent } from './schedule-demo/demo.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { DatexPipe } from './date.pipe';

@NgModule({
  declarations: [
    Carousel,
    Slide,
    MenuComponent,
    DemoComponent,
    TemplateComponent,
    TemplateHeader,
    TemplateFooter,
    MenuComponent,
    SearchComponent,
    TabsComponent,
    TabComponent,
    DatexPipe
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
    TemplateComponent,
    SearchComponent,
    TabsComponent,
    TabComponent,
    DatexPipe,
    AgmCoreModule
  ]
})
export class SharedModule {}