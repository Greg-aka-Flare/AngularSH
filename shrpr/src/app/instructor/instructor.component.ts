import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TabsComponent } from "../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Course } from "../courses/course.interface";
import { CourseService } from "../courses/course.service";
import { Instructor } from "./instructor.interface";
import { InstructorService } from "./instructor.service";

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})

export class InstructorComponent implements OnInit, OnDestroy {
  instructors:any;
  courses: any;
  courseCard:any[] = [];
  private myid:number;
  reviewCount:number;
  ratingData:any;
  reviewRating:number;
  userRating:number = 0;
  loopCounter:number = 0;
  reviewRatingGross:number;
  ratingDataParse:any;
  //subscription: Subscription;
  private subscriptions = new Subscription();
  instrocterdata:string;
  
  details:any;
  
  width = document.documentElement.clientWidth;
  goTo(location: string): void {
    window.location.hash = location;
  }
  constructor(private instructorService: InstructorService, private route: ActivatedRoute, private courseService: CourseService) { 
    let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.myid = params['id'];
    }))
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;
    }));
  }
  
  ngOnInit() {
    this.subscriptions.add(this.courseService.getCourses()
    .subscribe(
      (courses) => {
       this.courses = courses;
       if(this.courses){
        for(var i = 0, l = this.courses.length; i < l; i++) {
          if( this.courses[i].instructor.id == this.myid){
              this.courseCard.push(this.courses[i]);
          } 
        }
       }
      },
      (error: Response) => console.log(error)
      
    ));

    this.subscriptions.add(this.instructorService.getInstructor(this.myid)
     .subscribe(
       (response) => {
        this.instructors = response;
        this.ratingData = this.instructors.ratings;
        this.details = JSON.parse(response.details);
        this.reviewCount = this.ratingData.length;
        this.loopCounter = this.reviewCount+1;
        for(var k=0; k < this.reviewCount; k++){
            this.userRating += this.ratingData[k].rating;
        }
        this.reviewRatingGross = this.userRating/this.reviewCount;
        },
       (error: Response) => console.log(error)
     ));
     
  }
  

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}