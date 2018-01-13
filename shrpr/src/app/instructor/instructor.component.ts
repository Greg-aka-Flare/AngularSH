import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from "../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddCourseComponent } from './add-course/add-course.component';

import { Course } from "../courses/course.interface";
import { CourseService } from "../courses/course.service";
import { Instructor } from "./instructor.interface";
import { InstructorService } from "./instructor.service";
import { AuthService } from './../auth/auth.service';


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
  courseCardLength:number;
  reviewshowHide:boolean = false;
  instructorCourse:any[]=new Array();
  counter:number = 0;
  loggedIn: boolean = false;
  details:any;
  showDialog:boolean;
  
  width = document.documentElement.clientWidth;
  goTo(location: string): void {
    window.location.hash = location;
  }
  constructor(
    private instructorService: InstructorService, 
    private route: ActivatedRoute, 
    private courseService: CourseService,  
    private auth: AuthService
  ) { 

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

    this.showDialog = false;
    
  }
  
  ngOnInit() {
    this.loggedIn = this.auth.loggedIn();
    this.subscriptions.add(this.courseService.getCourses()
    .subscribe(
      (courses) => {
       this.courses = courses;
       if(this.courses){
        for(let i = 0; i < this.courses.length; i++) {
          if( this.courses[i].instructor.id == this.myid){
              this.courseCard.push(this.courses[i]);
          } 
        }
        for(var j = this.counter, l = this.courses.length; j < l; j=j)
        {
          if(this.courseCard[j]){
            this.instructorCourse.push(this.courseCard[j]);
          }
          j++;
          if(j%3 == 0) break;
        }
        this.counter += 3;
      }
      },
      (error: Response) => console.log(error)
      
    ));

    

    this.subscriptions.add(this.instructorService.getInstructor(this.myid)
     .subscribe(
       (instructors) => {

        this.instructors = instructors;
        this.ratingData = this.instructors.ratings;
        this.details = JSON.parse(instructors.details);
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
  
  getData(){
    for(var k = this.counter, p = this.courses.length; k < p; k=k)
    {
      if(this.courseCard[k]){
      this.instructorCourse.push(this.courseCard[k]);
      }
      k++;
    if(k%3 == 0) break;
    }
    this.counter+=3;
  }
  

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}