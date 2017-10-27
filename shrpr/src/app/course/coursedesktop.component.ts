import { Component, OnInit, OnDestroy, Input, Pipe, PipeTransform } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GroupsPipe } from './filter.pipe';
import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { LikeService } from "../like.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';


@Component({
  selector: 'app-coursedesktop',
  templateUrl: './coursedesktop.component.html',
  styleUrls: ['./coursedesktop.component.css'],
  providers: [],
  animations: [
    trigger('flyout', [
      state('out', style({
        transform: 'translateX(-200%)'
      })),
      transition('* => out', animate('300ms ease-in')),
    ])
  ]
})

export class CoursedesktopComponent implements OnInit {
 // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<Course[]>([]);
  courses: any[];
  counter: number = 0;
  subscription: Subscription;
  likeCourses: any[] = []; 
  // change data to use getter and setter
  
  @Input()
  set data(value) {
      // set the latest value for _data BehaviorSubject
      this._data.next(value);
  };

  get data() {
      // get the latest value from _data BehaviorSubject
      return this._data.getValue();
  };

  constructor(private likeService: LikeService) {
  }
  
  
  ngOnInit() {
    //check when input changes
    this._data
        .subscribe(x => {
            this.courses = this.data;
            if(this.courses) {
              for(var i = 0, l = this.courses.length; i < l; i++) {
                this.courses[i].state = 'default';
              }
            }
        });

      this.subscription = this.likeService.getCounter().subscribe((count) => {
        this.counter = count;
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onLike(id){
    this.likeService.incrementCounter();
    this.likeCourses.push(id);
    console.log("Selected course id: " + id);
    var course = this.courses.filter(function( obj ){
      if(obj.id == id) obj.state = 'like';
    });
  }
  
  onDislike(id){
    var course = this.courses.filter(function( obj ){
      if(obj.id == id) obj.state = 'dislike';
    });
  }
}