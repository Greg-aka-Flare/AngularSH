import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { TabsComponent } from "../home/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';



import { Course } from "../course.interface";
import { CourseService } from "../course.service";

@Component({
  selector: 'app-coursecard',
  templateUrl: './coursecard.component.html',
  styleUrls: ['./coursecard.component.css']
})
export class CoursecardComponent implements OnInit, OnDestroy {

  private id: number;
  course: any;
  semesterDetails:string;
  primaryImg:string;
  secondaryImg:string;
  reviewCount:number;
  ratingData:any;
  reviewRating:number;
  userRating:number = 0;
  loopCounter:number = 0;
  reviewRatingGross:number;
  ratingDataParse:any;
  //subscription: Subscription;
  private subscriptions = new Subscription();
  width = document.documentElement.clientWidth;
  lat: number = 51.678418;
  lng: number = 7.809007;
  disableAutoPan: boolean;
  fullscreenControl: boolean;
  
  


  //The time to show the next photo
  private NextPhotoInterval:number = 5000;
  //Looping or not
  private noLoopSlides:boolean = false;
  //Photos
  private slides:Array<any> = [];


  constructor(
    private courseService: CourseService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    }))
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;
    }));

    this.subscriptions.add(this.courseService.getCourse(this.id).subscribe(course => {
      this.course = course;
      this.ratingData = this.course.ratings;
      
      this.semesterDetails = JSON.parse(this.course.semesters[0].details);
      this.primaryImg = this.course.semesters[0].primary_img;
      this.secondaryImg = JSON.parse(this.course.semesters[0].details).secondary_img;
      this.slides.push(
        //{image:'../../assets/img/'+ this.primaryImg},
        //{image:'../../assets/img/'+ this.secondaryImg}
        {image:'../../assets/img/court.jpg'},
        {image:'../../assets/img/court-two.jpg'}
      );

      //initializing the google co-ordinates
      this.lat = this.course.semesters[0].addresses[0].latitude;
      this.lng = this.course.semesters[0].addresses[0].longitude;
      
      this.reviewCount = this.ratingData.length;
      this.loopCounter = this.reviewCount+1;
      for(var k=0; k < this.reviewCount; k++){
          this.userRating += this.ratingData[k].rating;
          
      }
      this.reviewRatingGross = this.userRating/this.reviewCount;
    }));

  }  
 
  private removeLastSlide() {
    this.slides.pop();
  } 
  
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}