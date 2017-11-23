import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custombranded',
  templateUrl: './custombranded.component.html',
  styleUrls: ['./custombranded.component.css']
})
export class CustombrandedComponent implements OnInit {

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
       {image:'../../assets/img/banner01.jpg',title:'Your shrpr page is your own personal website'},
       {image:'../../assets/img/banner02.jpg',title:'No cost for your own domain, web developer or graphic design'},
       {image:'../../assets/img/banner03.jpg',title:'Direct your customers to your page on your posters, postcards and social media posts'},
       {image:'../../assets/img/banner04.jpg',title:'Make it Yours. Customize Your Look and Feel. '},
   );
}

private removeLastSlide() {
   this.slides.pop();
} 
  ngOnInit() {
  }

}
