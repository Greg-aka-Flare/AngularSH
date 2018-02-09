import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from "@angular/http";

import { Course, CourseService, CuriousService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/auth';

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
    ]),
    trigger('pulse', [
      state('beat', style({
        animation: 'beats .2s alternate'
      })),
      state('default', style({
        animation: 'beats .2s alternate',
      })),
      transition('default <=> beat', animate('100ms ease-in'))
    ])
  ]
})

export class CuriousMobileComponent implements OnInit {
  //suggestion form group variable
  suggestForm: FormGroup;
  //boolean variable to check suggest complete or not
  suggestComplete: boolean = false;
   //variable to hold all courses array
  courses: Course[];
  //define the like counter variable
  counter: number = 0;
  //variable to hold the clicked sort id in filtering the course card
  selectedIndex:number;
  //variable to hold all the subscription, and to be destroy in ngOnDestroy()
  private subscriptions = new Subscription();
  //variable to set the animation of like count heart on increament
  pulseState:string = '';
  //array to hold liked course id which is available in local storage
  likeArray: number[] = [];

  isBtnActive: boolean = true;
  loggedIn: boolean = false;
  constructor(
    private courseService: CourseService, 
    private curious: CuriousService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.suggestForm = new FormGroup({
      'suggest': new FormControl(null, [Validators.required, Validators.min(100)])
    });
    //create parameters
    let parameters = {
      group: 0,
      limit: 10,
      filter: true
    }

   this.courseService.getCourses(parameters).subscribe(courses => this.courses = courses);
   //variable to check user is logged in or not 
   this.loggedIn = this.auth.loggedIn();
   //if user is not logged in show the sign in button   
   if(this.auth.loggedIn()){
       this.isBtnActive = false;
      } 
   //get the like courses number from local storage   
   this.updateCounter(); 
   //initialize the group id with zero
   this.selectedIndex = 0;
      
  }

  ngOnDestroy(){
    //un subscribe all the subscription
    this.subscriptions.unsubscribe();
  }
  //toogle the isBtnActive as false
  toggleClass() {
    this.isBtnActive = false;
  }
  //suggestion form submit function
  onSuggest() {
    let data = {
      'suggestion': this.suggestForm.value.suggest
    }
    this.courseService.suggest(data).subscribe(
      success => {
        //course suggested
        this.suggestComplete = true;
      }
    );
  }
  //course like function
  onLike(course, i) {
    //if pulse state is already as beat change to default
    if(this.pulseState === 'beat'){
      this.pulseState = 'default';
    }
    //other wise define as beat
    else{
      this.pulseState = 'beat';
    }

    if(course.state === 'default'){

      //set state to like
      course.state = 'like';

      //increment like counter
      this.curious.like(course.id).subscribe(
        success => {

          //add new course
          this.addNewCourse(course, i);
        },
        error => {
          //log error
          console.log(error);

          //add new course
          this.addNewCourse(course, i);
        }
      );
    }
    this.updateCounter();
  }
  //course dislike function
  onDislike(course, i) {

    if(course.state === 'default'){

      //set state to like
      course.state = 'dislike';

      //increment like counter
      this.curious.dislike(course.id).subscribe(
        success => {
          
          //add new course
          this.addNewCourse(course, i);
        },
        error => {
          //log error
          console.log(error);

          //add new course
          this.addNewCourse(course, i);
        }
      );
    }
  }
  //function to call a new course card on swipe
  private addNewCourse(course, i) {
    let newCourse: Course;
    //check the active sort group id
    if(this.selectedIndex < 1){
      //if none of sort button clicked set to zero
      this.selectedIndex = 0;
    }
    //wait 100ms for animation to finish
    setTimeout(() => {
      //get excludes
      let excludes = this.createExcludes();
      //create parameters
      let parameters = {
        group: this.selectedIndex,
        limit: 1,
        filter: true,
        'excludes[]': excludes
    }

      //get new course
      this.courseService.getCourses(parameters).subscribe(course => {
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
  //sort function of the course card
  sortbyGroup(id: number) {
    let excludes = this.createExcludes();
    //get the group id of selected group
    this.selectedIndex = id;
    //empty the courses array to hold new sorted courses
    this.courses = [];
     //define the parameter
    let parameters = {
      group: id,
      limit: 1,
      filter: true,
      'excludes[]': excludes
    }
    //get the new courses card by group which is clicked on sort
    this.subscriptions.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.courses = courses;
    }));
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
  //function to update like counter from local storage
  updateCounter(){
    if(JSON.parse(localStorage.getItem('likes'))){
      this.likeArray = JSON.parse(localStorage.getItem('likes'));
      this.counter = this.likeArray.length;
    }
    else{
      this.counter = 0;
    }
  }
  
}