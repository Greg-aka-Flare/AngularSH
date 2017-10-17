import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
 
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
  courses: any[];
  content:any[]=new Array();
  counter:number;
  constructor(private courseService: CourseService) {
      this.counter=0;
  }

  ngOnInit() {
    this.courseService.getCourses()
      .subscribe(
        (courses: any[]) => {
          this.courses = courses;

          for (var i = 0, l = courses.length; i < l; i++) {
            courses[i].state = 'default';
          }
          for(let i=this.counter+1; i<this.courses.length; i++){
            this.content.push(this.courses[i]);
            if(i%3==0) break;
          } 
          this.counter+=3; 
        },
        (error: Response) => console.log(error)
      );
  }
  
  getData(){
    for(let i=this.counter+1; i<this.courses.length; i++){
      this.content.push(this.courses[i]);
      if(i%3==0) break;
    }
    this.counter+=3;
  }

  onLike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'like';
  }

  onDislike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
  }
}