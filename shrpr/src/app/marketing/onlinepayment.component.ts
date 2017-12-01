import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MarketingformComponent } from './marketingform.component';
import { MarketingnavComponent } from './marketingnav.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-onlinepayment',
  templateUrl: './onlinepayment.component.html',
  styleUrls: ['./onlinepayment.component.css']
})
export class OnlinepaymentComponent implements OnInit {
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
       {image:'../../assets/img/banner01.jpg',title:'Accept All Major Credit Cards'},
       {image:'../../assets/img/banner02.jpg',title:'Accept New Payment Methods '},
       {image:'../../assets/img/banner03.jpg',title:'Make Money After Hours',detail:'People can enroll while they watch the late late show, or the early risers can pick a course at sunrise.'},
       {image:'../../assets/img/banner04.jpg',title:'Who still has a check book?',detail:'No More Paper Enrollment Forms. No More Checks'},
       {image:'../../assets/img/banner05.jpg',title:'Get Paid Every Day',detail:'Money is automatically sent to your checking account daily'},
   );
}

private removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
