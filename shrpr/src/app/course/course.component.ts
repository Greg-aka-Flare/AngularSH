import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
 
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  //templateUrl: window.screen.width < 900 ? "./course.component.html" : "./tcard.component.html",
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('cardSwipe', [
      state('like', style({
        transform: 'translate3d(-200%, 20%, 0)'
      })),
      state('dislike', style({
        transform: 'translate3d(200%, 20%, 0)'
      })),
      transition('default => like', animate('500ms ease-in')),
      transition('default => dislike', animate('500ms ease-in')),
    ]),
    trigger('overlay', [
      state('in', style({
        backgroundColor: '#28e93b',
        zindex:1
      })),
      state('out', style({
        backgroundColor: '#e92828',
        zindex:1
      })),
      transition('void => *', [
        style({
          opacity:0
        }),
        animate(100)
      ])
    ]),
    trigger('divState', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity:0,
          transform:'translateX(-100px)'
        }),
        animate(300)
      ])
    ])
  ]
})

export class CourseComponent implements OnInit {

  // initialize a private variable _data, it's a BehaviorSubject
  private _data = new BehaviorSubject<Course[]>([]);

  courses: any[];

  @Input() course: Course;
  @Output() courseDeleted = new EventEmitter<Course>();
  editing = false;
  editValueName = '';
  editValueAddress = '';
  editValueCity = '';
  editValueState = '';
  editValueZip = '';

  // change data to use getter and setter
  @Input()
  set data(value) {
      // set the latest value for _data BehaviorSubject
      this._data.next(value);
  };

  get data() {
      // get the latest value from _data BehaviorSubject
      return this._data.getValue();
  }

  constructor(private courseService: CourseService) {
      
  }

  ngOnInit() {
    //check when input changes
    this._data
        .subscribe(x => {
            this.courses = this.data;

            if(this.courses) {
              for(var i = 0, l = this.courses.length; i < l; i++) {

                this.courses[i].state = 'default';
              }
            }
          });
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
  colorState: string;
  onLike(i){

    if(this.courses[i].state == 'default') this.courses[i].state = 'like';
    this.colorState = 'in';  
  }

  onDislike(i){

    if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
    this.colorState = 'out';
  }
}