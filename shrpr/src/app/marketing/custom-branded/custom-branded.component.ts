import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';
import { Carousel } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-custom-branded',
  templateUrl: './custom-branded.component.html',
  styleUrls: ['./custom-branded.component.css']
})
export class CustomBrandedComponent implements OnInit {
  constructor() {
   }

  ngOnInit() {
  }

}
