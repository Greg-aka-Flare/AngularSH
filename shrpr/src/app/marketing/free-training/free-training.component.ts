import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';
import { Carousel } from '../../shared/carousel/carousel.component';


@Component({
  selector: 'app-free-training',
  templateUrl: './free-training.component.html',
  styleUrls: ['./free-training.component.css']
})
export class FreeTrainingComponent implements OnInit {
  
  constructor() {
   }
  ngOnInit() {
  }

}
