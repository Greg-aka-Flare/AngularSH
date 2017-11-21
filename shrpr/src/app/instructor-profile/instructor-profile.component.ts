import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class InstructorProfileComponent implements OnInit, OnDestroy {
  instructors:any[];
  courses: any[];
  courseCard: any[] = [];
  private id:number;
  subscription: Subscription;
  details:string;

  width = document.documentElement.clientWidth;

  constructor(private instructorService: InstructorService, private route: ActivatedRoute, private courseService: CourseService) { 
    let sub = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
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
            this.courseCard.push(this.courses[i]);
          }
        }
       }
      },
      (error: Response) => console.log(error)
      
    );

     this.instructorService.getInstructor(this.id)
     .subscribe(
       (response) => {
        this.instructors = response;
        this.details = JSON.parse(response.details);
        },
       (error: Response) => console.log(error)
     );
  }

  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }
}