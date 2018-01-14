import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from "@angular/http";

import { Course } from '../../../courses/course.interface';
import { CourseService } from '../../../courses/course.service';
import { CuriousService } from '../../curious.service';
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-curious-mobile',
  templateUrl: './curious-mobile.component.html',
  styleUrls: ['./curious-mobile.component.css'],
  animations: [
    trigger('cardSwipe', [
      state('like', style({
        transform: 'translateX(200%)'
      })),
      state('dislike', style({
        transform: 'translateX(-200%)'
      })),
      transition('default => like', animate('300ms ease-in')),
      transition('default => dislike', animate('300ms ease-in')),
    ]),
    trigger('overlay', [
      state('like', style({
        backgroundColor: 'rgba(40, 233, 59, 0.2)'
      })),
      state('dislike', style({
        backgroundColor: 'rgba(233, 40, 40, 0.2)'
      })),
      transition('void => *', [
        style({
          opacity:0.5
        }),
        animate(100)
      ])
    ]),
    trigger('form', [
      state('in', style({
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({ transform: 'translateX(200%)' }),
        animate('300ms ease-in')])
    ])
  ]
})

export class CuriousMobileComponent implements OnInit {

  suggestForm: FormGroup;
  suggestComplete: boolean = false;
  courses: Course[];
  counter: number = 0;
  colorState: string;
  //subscription: Subscription;
  private subscriptions = new Subscription();

  editing = false;
  editValueName = '';
  editValueAddress = '';
  editValueCity = '';
  editValueState = '';
  editValueZip = '';
  isBtnActive: boolean = true;
  loggedIn: boolean = false;
  constructor(
    private courseService: CourseService, 
    private curious: CuriousService,
    private auth: AuthService
  ) {}

  ngOnInit() {

    this.suggestForm = new FormGroup({
      'suggest': new FormControl(null, Validators.required)
    });

    this.subscriptions.add(this.courseService.getCourses(0, 10, true).subscribe(courses => {
      this.courses = courses;
    }));

    this.subscriptions.add(this.curious.likeCounter().subscribe((count) => {
      this.counter = count;
    }));
    
   this.loggedIn = this.auth.loggedIn();
      
   if(this.auth.loggedIn()){
       this.isBtnActive = false;
      }  
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  toggleClass() {
    this.isBtnActive = false;
  }

  onSuggest() {

    //course suggested
    this.suggestComplete = true;
  }

  onLike(course, i) {

    if(course.state === 'default'){

      //set state to like
      course.state = 'like';

      //increment like counter
      this.curious.like(course.id);

      //add new course
      this.addNewCourse(course, i);
    }
  }

  onDislike(course, i) {

    if(course.state === 'default'){

      //set state to like
      course.state = 'dislike';

      //increment like counter
      this.curious.dislike(course.id);

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
      this.courseService.getCourses(0, 1, true, excludes).subscribe(course => {

        if(course.length > 0){

          //new course
          newCourse = course[0];

          //add new course
          this.courses.splice(i, 1, newCourse);
        }
        else{

          //remove final course
          this.courses.splice(i, 1);
        }
      });

    }, 300);
  }

  private createExcludes() {

    let excludes: number[] = [];

    //for each group, create array of ids to exclude, return array
    if(this.courses.length > 0){

      for(let course of this.courses){

        excludes.push(course.id);
      }
    }

    return excludes;
  }
  
}