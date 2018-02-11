import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from '@angular/http';
import { Course, CourseService, CuriousService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-curious-desktop',
  templateUrl: './curious-desktop.component.html',
  styleUrls: ['./curious-desktop.component.css'],
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
export class CuriousDesktopComponent implements OnInit, OnDestroy {
  //suggestion form group variable
  suggestForm: FormGroup;
  //boolean variable to check suggest complete or not
  suggestComplete: boolean = false;
  //variable to hold all courses array
  courses: Course[];
  //define the like counter variable
  counter: number = 0;
  //variable to hold all the subscription, and to be destroy in ngOnDestroy()
  private subscriptions = new Subscription();
  //variable to hold the clicked sort id in filtering the course card
  selectedIndex:number;
  //variable to set the animation of like count heart on increament
  pulseState:string = '';
  //array to hold liked course id which is available in local storage
  likeArray: number[] = [];

  constructor(
    private courseService: CourseService,
    private curious: CuriousService
   ) {}

  ngOnInit() {
    this.suggestForm = new FormGroup({
      'suggest': new FormControl(null, [Validators.required, Validators.min(100)])
    });
    
    
    //create parameters
    let parameters = {
      limit: 9,
      filter: true
    }

    this.subscriptions.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.courses = courses;
    }));
    //get the like count number
    this.updateCounter();
    //initialize the group id with zero if none of the sort button is clicked
    this.selectedIndex = 0;
    
  }
  //function to sort the course card by group id
  sortbyGroup(id: number) {
    //get the id of group which is clicked
    this.selectedIndex = id;
    let excludes = this.createExcludes();
    //empty the courses array to hold new sorted courses
    this.courses = [];
    //define the parameter
    let parameters = {
      group: id,
      limit: 9,
      filter: true,
      'excludes[]': excludes
    }
    //get the new courses card by group which is clicked on sort
    this.subscriptions.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.courses = courses;
    }));
  }

  ngOnDestroy() {
    //unsubscribe all the subscription
    this.subscriptions.unsubscribe();
  }

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
    //update the link counter
    this.updateCounter();
  }

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

  private addNewCourse(course, i) {
    let newCourse: Course;
    //check group id if none of sorting button is activated
    if(this.selectedIndex < 1){
      //if none of group id then initialze it zero
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

  private createExcludes() {

    let excludes: number[] = [];

    //create array of ids to exclude, return array
    if(this.courses.length > 0){
      for(let course of this.courses){
        excludes.push(course.id);
      }
    }
    return excludes;
  }
  //function to update the like counter
  updateCounter(){
    //check if local storage already have likes value
    if(JSON.parse(localStorage.getItem('likes'))){
      //get local storage as an array
      this.likeArray = JSON.parse(localStorage.getItem('likes'));
      //get the number of the liked courses
      this.counter = this.likeArray.length;
      console.log(this.likeArray);
    }
    else{
      //if local storage is blank set it to zero
      this.counter = 0;
    }
  }
}