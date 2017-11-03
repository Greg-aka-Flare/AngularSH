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

import { Instructor } from "../instructor.interface";
import { InstructorService } from "../instructor.service";

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  instructors:any[];
  private id:number;
  subscription: Subscription;
  width = document.documentElement.clientWidth;
  
  constructor(private instructorService: InstructorService, private route: ActivatedRoute) { 
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
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
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

}
