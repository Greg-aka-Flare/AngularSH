import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import {trigger, state, style, transition, animate} from '@angular/animations';
import { TabsComponent } from "../home/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { Instructor } from "../instructor.interface";
import { InstructorService } from "../instructor.service";

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  instructor: Instructor[];
  width = document.documentElement.clientWidth;
  
  constructor(private instructorService: InstructorService) { 
  //constructor() { 
    
    
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
    $resizeEvent.subscribe(data => {
      this.width = data;
    });

  }

  ngOnInit() {
    // this.instructorService.getInstructor(this.instructor.id)
    // .subscribe(
    //   (instructor: Instructor) =>  instructor,
    //   (error: Response) => console.log(error)
    // );
    
  }

}
