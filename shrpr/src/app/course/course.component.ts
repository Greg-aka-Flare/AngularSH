import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {trigger, state, style, transition, animate } from '@angular/animations';

import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
 
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('cardSwipe', [
      state('initial', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('left', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      state('right', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('left => right', animate('400ms ease-in-out')),
      transition('right => left', animate('400ms ease-in-out')),
    ]),
  ]
  
})

export class CourseComponent implements OnInit {
  courses: Course[];

  @Input() course: Course;
  @Output() courseDeleted = new EventEmitter<Course>();
  editing = false;
  editValueName = '';
  editValueAddress = '';
  editValueCity = '';
  editValueState = '';
  editValueZip = '';

  constructor(private courseService: CourseService) {
      
  }

  ngOnInit() {
    this.courseService.getCourses()
      .subscribe(
        (courses: Course[]) => this.courses = courses,
        (error: Response) => console.log(error)
      );
  }

  onEdit(){
    this.editing = true;
    this.editValueName = this.course.title;
    this.editValueAddress = this.course.address;
    this.editValueCity = this.course.city;
    this.editValueState = this.course.state;
    this.editValueZip = this.course.zip;
  }

  onUpdate(){
    this.courseService.updateCourse(this.course.id, this.editValueName)
      .subscribe(
        (course: Course) => {
          this.course.title = this.editValueName;
          this.course.address = this.editValueAddress;
          this.course.city = this.editValueCity;
          this.course.state = this.editValueState;
          this.course.zip = this.editValueZip;
        }
      );
    
    this.editing = false;
  }

  onCancel(){
    this.editValueName = '';
    this.editing = false;
  }

  onDelete(){
    this.courseService.deleteCourse(this.course.id)
      .subscribe(
        () => {
          this.courseDeleted.emit(this.course);
          console.log('Course deleted');
        }
      );
  }

  // constant for swipe action: left or right
  isVisible: boolean = false;
  isHide: boolean = true;
  selectedIndex: number = 0;
  swipeDirection:string = 'initial';
  
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

     

    // action triggered when user swipes
    swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {

        // out of range
        if (currentIndex > this.courses.length || currentIndex < 0) return;
        this.isVisible = !this.isVisible;
        this.isHide = !this.isHide;
        let nextIndex = 0;
        
        // swipe right, next course
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.swipeDirection = 'right';
            const isLast = currentIndex === this.courses.length - 1;
            nextIndex = isLast ? 0 : currentIndex + 1;
        }

        // swipe left, previous course
        if (action === this.SWIPE_ACTION.LEFT) {
            this.swipeDirection = 'left';
            const isLast = currentIndex === this.courses.length - 1;
            nextIndex = isLast ? 0 : currentIndex + 1;
            //const isFirst = currentIndex === 0;
            //nextIndex = isFirst ? this.courses.length - 1 : currentIndex - 1;
        }

        // selected index
        this.selectedIndex = nextIndex;
        //this.swipeDirection = 'initial';
        
    }
}