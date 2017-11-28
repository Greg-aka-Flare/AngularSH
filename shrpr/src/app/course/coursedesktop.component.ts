import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { LikeService } from "../like.service";
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
    state('remove', style({
      opacity: 0,
      width: 0
    })),
    transition('void => default', animate('300ms ease-in')),
    transition('default => like', animate('100ms ease-out')),
    transition('default => dislike', animate('100ms ease-out')),
    transition('* => remove', animate('100ms ease-in'))
  ])
]
})

export class CoursedesktopComponent implements OnInit, OnDestroy {

  suggestForm: FormGroup;
  showFun: boolean = true;
  showWork: boolean = true;
  showKids: boolean = true;

  forFun: Course[];
  forWork: Course[];
  forKids: Course[];
  counter: number;
  
  //counterSubscription: Subscription;
  private counterSubscription = new Subscription();

  constructor(
    private courseService: CourseService,
    private likeService: LikeService
   ) {}

  ngOnInit() {

    this.suggestForm = new FormGroup({
      'suggest': new FormControl(null, Validators.required)
    });

    this.counterSubscription.add(this.courseService.getCourses(1, 3, true).subscribe(courses => {
      this.forFun = courses;
    }));

    this.counterSubscription.add(this.courseService.getCourses(2, 3, true).subscribe(courses => {
      this.forWork = courses;
    }));

    this.counterSubscription.add(this.courseService.getCourses(3, 3, true).subscribe(courses => {
      this.forKids = courses;
    }));

    this.counterSubscription.add(this.counterSubscription = this.likeService.getCounter().subscribe((count) => {
      this.counter = count;
    }));
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

  onSuggest(group: number) {
    switch (group) {
      case 0:
        this.showFun = false;
        break;

      case 1:
        this.showWork = false;
        break;

      case 2:
        this.showKids = false;
        break;
    }
  }

  onLike(course, i) {

    if(course.state === 'default'){

      //set state to like
      course.state = 'like';

      //increment like counter
      this.likeService.likeCounter(course.id);

      //add new course
      this.addNewCourse(course, i);
    }
  }

  onDislike(course, i) {

    if(course.state === 'default'){

      //set state to like
      course.state = 'dislike';

      //increment like counter
      this.likeService.dislikeCounter(course.id);

      //add new course
      this.addNewCourse(course, i);
    }
  }

  private addNewCourse(course, i) {

    let newCourse: Course;

    //wait 100ms for animation to finish
    setTimeout(() => {

      //get excludes
      let excludes = this.createExcludes();

      //get new course
      this.courseService.getCourses(course.group.id, 1, true, excludes).subscribe(courses => {

        if(courses.length > 0){

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
        }
        else{

          //set state to remove
          course.state = 'remove';

          //wait 100ms for animation to finish
          setTimeout(() => {

            //check group id, update necessary group
            switch(course.group.id){
              case 1:
                this.forFun.splice(i, 1);
              break;

              case 2:
                this.forWork.splice(i, 1);
              break;

              case 3:
                this.forKids.splice(i, 1);
              break;
            }
          }, 100);
        }
      });

    }, 100);
  }

  private createExcludes() {

    let excludes: number[] = [];

    //for each group, create array of ids to exclude, return array
    if(this.forFun.length > 0){

      for(let course of this.forFun){

        excludes.push(course.id);
      }
    }

    if(this.forWork.length > 0){

      for(let course of this.forWork){

        excludes.push(course.id);
      }
    }

    if(this.forKids.length > 0){

      for(let course of this.forKids){

        excludes.push(course.id);
      }
    }

    return excludes;
  }
}