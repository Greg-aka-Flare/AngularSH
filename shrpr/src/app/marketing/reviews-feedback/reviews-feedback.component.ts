import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';
import { Carousel } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-reviews-feedback',
  templateUrl: './reviews-feedback.component.html',
  styleUrls: ['./reviews-feedback.component.css']
})
export class ReviewsFeedbackComponent implements OnInit {
  constructor() {
   }
  ngOnInit() {
  }

}
