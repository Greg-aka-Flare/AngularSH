import { Component, OnInit } from '@angular/core';
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
import { Instructor } from "../instructor.interface";
import { InstructorService } from "../instructor.service";

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  instructors:any[];
  courses: any[];
  courseCard: any[] = [];
  private id:number;
  subscription: Subscription;
  details:string;
// change data to use getter and setter
  width = document.documentElement.clientWidth;

  constructor(private instructorService: InstructorService, private route: ActivatedRoute, private courseService: CourseService) { 
  //constructor() { 
    let sub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      //console.log('param id: ' + this.id);
    })
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
    $resizeEvent.subscribe(data => {
      this.width = data;
    });
  }
  
  ngOnInit() {
    this.courseService.getCourses()
    .subscribe(
      (response) => {
       this.courses = response;   
       if(this.courses){
        for(var i = 0, l = this.courses.length; i < l; i++) {
          if(this.courses[i].instructor.id == this.id){
            //console.log(this.courses[i]);
            this.courseCard.push(this.courses[i]);
            
          }
        }
        //console.log(this.courseCard);
       }
      },
      (error: Response) => console.log(error)
      
    );

     this.instructorService.getInstructor(this.id)
     .subscribe(
       (response) => {
        this.instructors = response;
        this.details = JSON.parse(response.details);

        //console.log(this.instructors)
        },
       //(instructors: Instructor[]) =>  this.instructors = instructors,
       (error: Response) => console.log(error)
       
     );
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}