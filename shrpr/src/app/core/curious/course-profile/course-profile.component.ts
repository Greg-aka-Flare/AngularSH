import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from "@angular/http";

import { Course } from '../../../courses/course.interface';
import { CourseService } from '../../../courses/course.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-course-profile',
  templateUrl: './course-profile.component.html',
  styleUrls: ['./course-profile.component.css'],
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

export class CourseProfileComponent implements OnInit, OnDestroy {

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
   ) {}

  ngOnInit() {

    this.suggestForm = new FormGroup({
      'suggest': new FormControl(null, Validators.required)
    });

    this.counterSubscription.add(this.courseService.getCourses(1, 6, true).subscribe(courses => {
      this.forFun = courses;
    }));

    this.counterSubscription.add(this.courseService.getCourses(2, 6, true).subscribe(courses => {
      this.forWork = courses;
    }));

    this.counterSubscription.add(this.courseService.getCourses(3, 6, true).subscribe(courses => {
      this.forKids = courses;
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