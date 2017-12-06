import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';
import { Carousel } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-reports-dashboards',
  templateUrl: './reports-dashboards.component.html',
  styleUrls: ['./reports-dashboards.component.css']
})
export class ReportsDashboardsComponent implements OnInit {
  constructor() {
   } 
  ngOnInit() {
  }

}
