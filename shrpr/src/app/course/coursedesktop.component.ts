import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
 
@Component({
  selector: 'app-coursedesktop',
  templateUrl: './coursedesktop.component.html',
  styleUrls: ['./coursedesktop.component.css'],
  animations: [
    trigger('divState', [
      state('in', style({
        opacity: 0,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform:'translateY(100px)'
        }),
        animate(300)
      ])
    ])
  ]
})

export class CoursedesktopComponent implements OnInit {

  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<Course[]>([]);

  courses: any[];
  content: any[] = [];
  counter: number;

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

  constructor() {
      this.counter = 0;
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

              for(let i = this.counter + 1; i < this.courses.length; i++){

                this.content.push(this.courses[i]);

                if(i % 3 == 0) break;
              } 
              this.counter += 3;
            }
        });
  }
  
  getData(){
    for(let i = this.counter + 1; i < this.courses.length; i++){

      this.content.push(this.courses[i]);

      if(i % 3 == 0) break;
    }

    this.counter += 3;
  }

  onLike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'like';
  }

  onDislike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
  }
}