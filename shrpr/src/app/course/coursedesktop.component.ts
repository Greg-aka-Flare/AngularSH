import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {GroupsPipe} from './filter.pipe';
import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { StarRatingModule } from 'angular-star-rating';


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
    ]),
    trigger('likeState', [
      state('yes', style({
        backgroundColor: '#28e93b'
      })),
      state('no', style({
        backgroundColor: '#ffffff'
      })),
      transition('* => *', [
        style({
          opacity:0.9
        }),
        animate(100)
      ])
    ]),
    trigger('dislikeState', [
      state('yes', style({
        backgroundColor: '#e92828'
      })),
      state('no', style({
        backgroundColor: '#ffffff'
      })),
      transition('* => *', [
        style({
          opacity:0.9
        }),
        animate(100)
      ])
    ])
  ]
  //,pipes: [GroupsPipe]
})

export class CoursedesktopComponent implements OnInit {
 // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<Course[]>([]);
  courses: any[];
  counterFun: number;
  counterWork: number;
  counterKids: number;
  funArray: any[] = [];
  workArray: any[] = [];
  kidsArray:any[] = [];
  likeCounter:number;
  likeArray:any[] = [];
  @Input() count: number = 0;
  isActive:boolean = false;
  isnotActive:boolean = false;
  dislikeArray: any[] = [];
  
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
      this.counterFun = 0;
      this.counterWork = 0;
      this.counterKids = 0;
      this.likeCounter = 0;
      this.isActive = false;
      this.isnotActive = false;
      
  }
  
  ngOnInit() {
    //check when input changes
    this._data
        .subscribe(x => {
            this.courses = this.data;

            if(this.courses) {
              for(var i = 0, l = this.courses.length; i < l; i++) {
                this.courses[i].state = 'default';
               
                //console.log(this.courses[i].group.name);
                if(this.courses[i].group.label == 'For Fun'){
                  this.funArray.push(this.courses[i]);
                }
                if(this.courses[i].group.label == 'For Work'){
                  this.workArray.push(this.courses[i]);
                }
                if(this.courses[i].group.label == 'For Kids'){
                  this.kidsArray.push(this.courses[i]);
                }
              }
              this.counterFun += 3;
              this.counterWork += 3;
              this.counterKids +=3;

            }
        });
  }
  
 /* getFunData(){
    for(let i = this.counterFun + 1; i < this.courses.length; i++){
      this.content.push(this.courses[i]);
      if(i % 3 == 0) break;
    }
    this.counter += 3;
  }*/
  /* onLike and onDislike function is only for the mobile view swipe animation*/
  onLike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'like';
  }
  onDislike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
  }
 /* like and dislike function is only for the like and dislike on card thumb in desktop */
 
 like(i){
   if(this.courses[i].state == 'default')
   {
    this.courses[i].state = 'yes';
    this.likeCounter++;
   }
   else if(this.courses[i].state == 'yes'){
    this.courses[i].state = 'default';
    this.likeCounter--;
   }

   this.likeArray.push(this.courses[i].id);
  }
  dislike(i){
    if(this.courses[i].state == 'default')
    {
     this.courses[i].state = 'no';
    }
    else if(this.courses[i].state == 'yes'){
     this.courses[i].state = 'no';
     this.likeCounter--;
    }
    else if(this.courses[i].state == 'no'){
      this.courses[i].state = 'default'; 
    }
    this.dislikeArray.push(this.courses[i].id);
  } 

}