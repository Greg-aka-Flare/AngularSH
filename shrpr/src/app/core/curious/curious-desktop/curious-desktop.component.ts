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

  suggestForm: FormGroup;
  suggestComplete: boolean = false;
  courses: Course[];
  counter: number = 0;
  colorState: string;
  private subscriptions = new Subscription();
  selectedIndex:number;
  pulseState:string = '';
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
    this.updateCounter();
  }

  sortbyGroup(id: number) {
    this.selectedIndex = id;
    this.courses = [];
    let parameters = {
      group: id,
      limit: 9,
      filter: true
    }
    this.subscriptions.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.courses = courses;
    }));
  }

  ngOnDestroy() {
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
    if(this.pulseState === 'beat'){
      this.pulseState = 'default';
    }
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

    //wait 100ms for animation to finish
    setTimeout(() => {

      //get excludes
      let excludes = this.createExcludes();

      //create parameters
      let parameters = {
        limit: 1,
        filter: true,
        excludes: excludes
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