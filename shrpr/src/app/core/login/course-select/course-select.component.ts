import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from "@angular/http";
import { CommonModule } from '@angular/common';
import { Course, CourseService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css'],
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

export class CourseSelectComponent implements OnInit, OnDestroy {

  selectCourseForm: FormGroup;
  showFun: boolean = true;
  showWork: boolean = true;
  showKids: boolean = true;

  forFun: Course[];
  forWork: Course[];
  forKids: Course[];
  counter: number;
  courseSelected:number;
  
  //counterSubscription: Subscription;
  private counterSubscription = new Subscription();

  constructor(
    private courseService: CourseService,
    private router: Router
   ) {
     this.courseSelected = 0;
   }

  ngOnInit() {
    
    
    this.selectCourseForm = new FormGroup({
      'selectedCourse': new FormControl(null, Validators.required)
    });

    //create parameters
    let parameters = {
      group: 1,
      limit: 6,
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

  onselectCourse(){
    const myCourse = this.selectCourseForm.value.selectedCourse;
    //console.log(this.selectCourseForm);
    this.router.navigateByUrl('student/62');
  }

  courseCount(){
    this.courseSelected++;
    console.log('selected Course: ' + this.courseSelected);
  }
}