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

  constructor(private courseService: CourseService) {
      
  }

  ngOnInit() {
    this.courseService.getCourses()
      .subscribe(
        (courses: any[]) => {
          this.courses = courses;
          for (var i = 0, l = courses.length; i < l; i++) {
            courses[i].state = 'default';
          }
        },
        (error: Response) => console.log(error)
      );
  }
  
  onLike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'like';
  }

  onDislike(i){
    if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
  }
}