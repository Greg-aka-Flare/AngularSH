import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-free-training',
  templateUrl: './free-training.component.html',
  styleUrls: ['./free-training.component.css']
})
export class FreeTrainingComponent implements OnInit {
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

  constructor() {
    this.addNewSlide();
   }

   public addNewSlide() {
    this.slides.push(
       {image:'../../assets/img/banner01.jpg',title:'Improve Yourself. Improve Your Offerings', detail:''},
       {image:'../../assets/img/banner02.jpg',title:'Marketing', detail:'Ad Platforms, Grassroots Tactics, Digital Opportunities. Learn how to maximize your enrollments and your earnings'},
       {image:'../../assets/img/banner03.jpg',title:'Finance', detail:'Pricing, Recording, Profitability. Learn how to make the most out of your dollars. '},
       {image:'../../assets/img/banner04.jpg',title:'Service', detail:'Difficult Customers. Challenging Situations. Providing Outstanding Service. Learn how to wow your students!'},
       {image:'../../assets/img/banner05.jpg',title:'Curriculum', detail:'New Curriculum. Tweaks to Current Offerings. All things to make your actual classes better. '},
   );
}

public removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
