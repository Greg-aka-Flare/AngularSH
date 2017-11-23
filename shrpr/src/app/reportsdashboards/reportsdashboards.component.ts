import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportsdashboards',
  templateUrl: './reportsdashboards.component.html',
  styleUrls: ['./reportsdashboards.component.css']
})
export class ReportsdashboardsComponent implements OnInit {

  images:Array<any> = [
    {"sType":"img","imgSrc":"../../assets/img/banner01.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner02.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner03.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner04.jpg"},
  ];


  //The time to show the next photo
  private NextPhotoInterval:number = 5000;
  //Looping or not
  private noLoopSlides:boolean = false;
  //Photos
  private slides:Array<any> = [];
  private slidescontent:Array<any> = [];
  wasClicked = false;
  hasClicked = false;
  hasedClicked = false;
  
      onClick() {
          this.wasClicked= true;
      }
      onhasClick() {
        this.hasClicked= true;
    }

    onhasedClick() {
      this.hasedClicked= true;
  }
  constructor() {
    this.addNewSlide();
   }

   private addNewSlide() {
    this.slides.push(
       {image:'../../assets/img/banner01.jpg',title:'Stop Flying Blind. Use Data to Make Decisions'},
       {image:'../../assets/img/banner02.jpg',title:'Finance, Marketing and Ratings, all in one place'},
       {image:'../../assets/img/banner03.jpg',title:'Leading Indicators ', detail:'Will help you know where to put your marketing efforts'},
       {image:'../../assets/img/banner04.jpg',title:'Lagging Indicators', detail:'Will show you how you did and help you decide how to improve'},
   );
}

private removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
