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
  ])
]
})

export class CuriousDesktopComponent implements OnInit, OnDestroy {

  /*suggestFormWork: FormGroup;
  suggestFormFun: FormGroup;
  suggestFormKids: FormGroup;
  showFun: boolean = true;
  showWork: boolean = true;
  showKids: boolean = true;

  forFun: Course[];
  forWork: Course[];
  forKids: Course[];
  counter: number;*/
  suggestForm: FormGroup;
  suggestComplete: boolean = false;
  courses: Course[];
  counter: number = 0;
  colorState: string;
  //counterSubscription: Subscription;
  private subscriptions = new Subscription();
  selectedIndex:number;

  constructor(
    private courseService: CourseService,
    private curious: CuriousService
   ) {}

  ngOnInit() {
    
    /*this.suggestFormWork = new FormGroup({
      'suggest': new FormControl(null, [Validators.required, Validators.min(100)])
    });

    this.suggestFormFun = new FormGroup({
      'suggest': new FormControl(null, [Validators.required, Validators.min(100)])
    });

    this.suggestFormKids = new FormGroup({
      'suggest': new FormControl(null, [Validators.required, Validators.min(100)])
    });

    //create parameters
    let parameters = {
      group: 1,
      limit: 3,
      filter: true
    }

    this.counterSubscription.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.forFun = courses;
    }));

    //update parameters
    parameters.group = 2;

    this.counterSubscription.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.forWork = courses;
    }));

    //update parameters
    parameters.group = 3;

    this.counterSubscription.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.forKids = courses;
    }));

    this.counterSubscription.add(this.counterSubscription = this.curious.likeCounter().subscribe((count) => {
      this.counter = count;
    }));*/
    this.suggestForm = new FormGroup({
      'suggest': new FormControl(null, [Validators.required, Validators.min(100)])
    });

    //create parameters
    let parameters = {
      group: 0,
      limit: 9,
      filter: true
    }

    this.subscriptions.add(this.courseService.getCourses(parameters).subscribe(courses => {
      this.courses = courses;
    }));

    this.subscriptions.add(this.curious.likeCounter().subscribe((count) => {
      this.counter = count;
    }));
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

  /*onSuggest(group: number) {

    let data: any = {};

    switch (group) {
      case 0:
        data.suggestion = this.suggestFormFun.value.suggest;
        this.courseService.suggest(data).subscribe(
          success => this.showFun = false
        );
        break;

      case 1:
        data.suggestion = this.suggestFormWork.value.suggest;
        this.courseService.suggest(data).subscribe(
          success => this.showWork = false
        );
        break;

      case 2:
        data.suggestion = this.suggestFormKids.value.suggest;
        this.courseService.suggest(data).subscribe(
          success => this.showKids = false
        );
        break;
    }

    this.courseService.suggest(data).subscribe(
      success => {
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
    );
  }

  onLike(course, i) {

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
        group: course.group.id,
        limit: 1,
        filter: true,
        excludes: excludes
      }

      //get new course
      this.courseService.getCourses(parameters).subscribe(courses => {

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
  }*/
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
        group: 0,
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

    //for each group, create array of ids to exclude, return array
    if(this.courses.length > 0){

      for(let course of this.courses){

        excludes.push(course.id);
      }
    }

    return excludes;
  }
}