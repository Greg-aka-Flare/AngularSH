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
       {image:'../../assets/img/banner01.jpg',title:'Promote your business',detail:'List your business in the MINDBODY Network to help the right customers find you.'},
       {image:'../../assets/img/banner02.jpg',title:'Keep your schedule full',detail:'New customers can book and pay for your services through these apps, anywhere, anytime.'},
       {image:'../../assets/img/banner03.jpg',title:'Boost engagement',detail:'Use promotion codes and gift cards to encourage your current customers to invite their friends.'},
       {image:'../../assets/img/banner04.jpg',title:'Track your success',detail:'See how your marketing efforts are performing with the Client Acquisition dashboard, then use the insights to improve.'}
   );
}

private removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
