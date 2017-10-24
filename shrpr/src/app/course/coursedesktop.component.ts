import { Component, OnInit, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
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
    ])
  ]
  //,pipes: [GroupsPipe]
})

export class CoursedesktopComponent implements OnInit {
 // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<Course[]>([]);
 
  courses: any[];
  contentFun: any[] = [];
  contentWork: any[] = [];
  contentKids: any[] = [];
  counterFun: number;
  counterWork: number;
  counterKids: number;
  funArray: any[] = [];
  workArray: any[] = [];
  kidsArray:any[] = [];
  likeCounter:number;
  likeArray:any[] = [];
  @Input() count: number = 0;
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
                if(this.courses[i].group.name == 'For Fun'){
                  this.funArray.push(this.courses[i]);
                }
                if(this.courses[i].group.name == 'For Work'){
                  this.workArray.push(this.courses[i]);
                }
                if(this.courses[i].group.name == 'For Kids'){
                  this.kidsArray.push(this.courses[i]);
                }
              }
              
              for(let j = this.counterFun + 1; j < this.funArray.length; j++){
                this.contentFun.push(this.funArray[j]);
                if(j % 3 == 0) break;
              } 
              this.counterFun += 3;

              for(let k = this.counterWork +1; k < this.workArray.length; k++){
                this.contentWork.push(this.workArray[k]);
                if(k % 3 == 0) break;
              }
              this.counterWork += 3;

              for(let l = this.counterKids +1; l < this.kidsArray.length; l++){
                this.contentKids.push(this.kidsArray[l]);
                if(l % 3 == 0) break;
              }
              this.counterKids +=3;

            }
        });
  }
  
  /*getData(){
    for(let i = this.counter + 1; i < this.courses.length; i++){
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
   this.count++;
   this.likeCounter++;
   this.likeArray.push(this.courses[i].id);
}

}