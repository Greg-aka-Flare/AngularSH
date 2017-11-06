import { Component, OnInit, Input } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';
import { TabsComponent } from "../home/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
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
  private id:number;
  subscription: Subscription;
  private _data = new BehaviorSubject<Course[]>([]);

// change data to use getter and setter
@Input()
set data(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
};

get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
}



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
    this._data
    .subscribe(x => {
        this.courses = this.data;
        if(this.courses) {
          for(var i = 0, l = this.courses.length; i < l; i++) {
            this.courses[i].state = 'default';
            console.log('course data: '+ this.courses[i].id);
          }
        }
    });

     this.instructorService.getInstructor(this.id)
     .subscribe(
       (response) => {
        this.instructors = response;   
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
