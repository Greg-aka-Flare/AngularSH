import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingFormComponent } from '../marketing-form.component';
import { MarketingNavComponent } from '../marketing-nav.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-custom-branded',
  templateUrl: './custom-branded.component.html',
  styleUrls: ['./custom-branded.component.css']
})
export class CustomBrandedComponent implements OnInit {

  images:Array<any> = [
    {"sType":"img","imgSrc":"../../assets/img/banner01.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner02.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner03.jpg"},
    {"sType":"img","imgSrc":"../../assets/img/banner04.jpg"},
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
       {image:'../../assets/img/banner01.jpg',title:'Your shrpr page is your own personal website'},
       {image:'../../assets/img/banner02.jpg',title:'No cost for your own domain, web developer or graphic design'},
       {image:'../../assets/img/banner03.jpg',title:'Direct your customers to your page on your posters, postcards and social media posts'},
       {image:'../../assets/img/banner04.jpg',title:'Make it Yours. Customize Your Look and Feel. '},
   );
}

public removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
