import { Component, OnInit } from '@angular/core';

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


  //The time to show the next photo
  private NextPhotoInterval:number = 5000;
  //Looping or not
  private noLoopSlides:boolean = false;
  //Photos
  private slides:Array<any> = [];

  constructor() {
    this.addNewSlide();
   }

   private addNewSlide() {
    this.slides.push(
       {image:'../../assets/img/banner01.jpg',text:'BMW 1'},
       {image:'../../assets/img/banner02.jpg',text:'BMW 2'},
       {image:'../../assets/img/banner03.jpg',text:'BMW 3'},
       {image:'../../assets/img/banner04.jpg',text:'BMW 4'},
       {image:'../../assets/img/banner05.jpg',text:'BMW 5'},
       {image:'../../assets/img/banner06.jpg',text:'BMW 6'}
   );
}

private removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
