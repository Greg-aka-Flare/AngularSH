import { Component, OnInit } from '@angular/core';
import { SafeHtmlPipe, contentSlider } from '../slider/slider.component';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  images:Array<any> = [
    {"sType":"img","imgSrc":"../../assets/img/banner01.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner02.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner03.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner04.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner05.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner06.jpg"}
  ];
  constructor() { }

  ngOnInit() {
  }

}
