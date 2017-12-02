import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Carousel } from '../carousel/carousel.component';
import { Slide } from '../carousel/slide.component';

@NgModule({
  declarations: [
    Carousel,
    Slide
  ],
  imports: [
  	CommonModule,
  ],
  exports: [
    Carousel,
    Slide
  ]
})
export class SharedModule {}