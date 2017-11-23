import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviewsfeedback',
  templateUrl: './reviewsfeedback.component.html',
  styleUrls: ['./reviewsfeedback.component.css']
})
export class ReviewsfeedbackComponent implements OnInit {

  images:Array<any> = [
    {"sType":"img","imgSrc":"../../assets/img/banner01.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner02.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner03.jpg"},
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
       {image:'../../assets/img/banner01.jpg',title:'Course Reviews'},
       {image:'../../assets/img/banner02.jpg',title:'Teacher Reviews'},
       {image:'../../assets/img/banner03.jpg',title:'Tools and Trainings for Improving your ratings'},
   );
}

private removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
