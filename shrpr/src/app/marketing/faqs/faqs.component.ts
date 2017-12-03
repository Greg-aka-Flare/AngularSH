import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  images:Array<any> = [
    {"sType":"img","imgSrc":"../../assets/img/banner01.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner02.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner03.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner04.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner05.jpg"},
  ];


  //The time to show the next photo
  public NextPhotoInterval:number = 5000;
  //Looping or not
  public noLoopSlides:boolean = false;
  //Photos
  public slides:Array<any> = [];
  public slidescontent:Array<any> = [];
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

   public addNewSlide() {
    this.slides.push(
       {image:'../../assets/img/banner01.jpg',title:'Communicate with your students via E-Mail and/or Text'},
       {image:'../../assets/img/banner02.jpg',title:'Automated Confirmations and Reminders'},
       {image:'../../assets/img/banner03.jpg',title:'Send Important Class Information'},
       {image:'../../assets/img/banner04.jpg',title:'Last Minute Cancellations/Inclement Weather'},
       {image:'../../assets/img/banner05.jpg',title:'COMING SOON! Custom Communications. '},
   );
}

public removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
