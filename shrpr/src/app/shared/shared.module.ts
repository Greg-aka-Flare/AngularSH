import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';

import { Carousel } from './carousel/carousel.component';
import { Slide } from './carousel/slide.component';
import { TemplateComponent } from './template/template.component';
import { TemplateHeader } from './template/template.component';
import { TemplateFooter } from './template/template.component';
import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from './search/search.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { DatexPipe } from './date.pipe';

@NgModule({
  declarations: [
    Carousel,
    Slide,
    MenuComponent,
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
    Ng2CompleterModule
  ],
  exports: [
    Carousel,
    Slide,
    TemplateComponent,
    SearchComponent,
    TabsComponent,
    TabComponent,
    DatexPipe
  ]
})
export class SharedModule {}