import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { LikeService } from "../like.service";
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';


@Component({
  selector: 'app-coursedesktop',
  templateUrl: './coursedesktop.component.html',
  styleUrls: ['./coursedesktop.component.css'],
  providers: [],
  animations: [
  trigger('state', [
    state('void', style({
      opacity: 0,
      transform: 'scale(0.5)'
    })),
    state('default', style({
      opacity: 1,
      transform: 'scale(1.0)'
    })),
    state('like', style({
      opacity: 0,
      transform: 'scale(0.9)'
    })),
    state('dislike', style({
      opacity: 0,
      transform: 'scale(0.9)'
    })),
    transition('void => default', animate('300ms ease-in')),
    transition('default => like', animate('100ms ease-out')),
    transition('default => dislike', animate('100ms ease-out'))
  ])
]
})

export class CoursedesktopComponent implements OnInit, OnDestroy {

  forFun: Course[];
  forWork: Course[];
  forKids: Course[];
  counter: number;
  
  counterSubscription: Subscription;

  constructor(
    private courseService: CourseService,
    private likeService: LikeService
   ) {}

  ngOnInit() {

    this.courseService.getCourses(1, 3).subscribe(courses => {
      this.forFun = courses;
    });

    this.courseService.getCourses(2, 3).subscribe(courses => {
      this.forWork = courses;
    });

    this.courseService.getCourses(3, 3).subscribe(courses => {
      this.forKids = courses;
    });

    this.counterSubscription = this.likeService.getCounter().subscribe((count) => {
      this.counter = count;
    });
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }

  onLike(course, i){

    if(course.state === 'default'){

      //set state to like
      course.state = 'like';

      //increment like counter
      this.likeService.likeCounter(course.id);

      //set variable
      let newCourse: Course;

      //wait 100ms for animation to finish
      setTimeout(() => {

        //get new course
        this.courseService.getCourses(course.group.id, 1).subscribe(courses => {

          //new course
          newCourse = courses[0];

          //check group id, update necessary group
          switch(course.group.id){
            case 1:
              this.forFun.splice(i, 1, newCourse);
            break;

            case 2:
              this.forWork.splice(i, 1, newCourse);
            break;

            case 3:
              this.forKids.splice(i, 1, newCourse);
            break;
          }
        });

      }, 100);
    }
  }

  onDislike(course, i){

    if(course.state === 'default'){

      //set state to like
      course.state = 'dislike';

      //increment like counter
      this.likeService.dislikeCounter(course.id);

      //set variable
      let newCourse: Course;

      //wait 100ms for animation to finish
      setTimeout(() => {

        //get new course
        this.courseService.getCourses(course.group.id, 1).subscribe(courses => {

          //new course
          newCourse = courses[0];

          //check group id, update necessary group
          switch(course.group.id){
            case 1:
              this.forFun.splice(i, 1, newCourse);
            break;

            case 2:
              this.forWork.splice(i, 1, newCourse);
            break;

            case 3:
              this.forKids.splice(i, 1, newCourse);
            break;
          }
        });

      }, 100);
    }
  }  
}