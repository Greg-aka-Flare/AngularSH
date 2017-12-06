import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';
import { Carousel } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-automated-communication',
  templateUrl: './automated-communication.component.html',
  styleUrls: ['./automated-communication.component.css']
})
export class AutomatedCommunicationComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
  }

}
