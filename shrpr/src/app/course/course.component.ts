import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { LikeService } from "../like.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';

 
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  //templateUrl: window.screen.width < 900 ? "./course.component.html" : "./tcard.component.html",
  styleUrls: ['./course.component.css'],
  animations: [
    trigger('cardSwipe', [
      state('like', style({
        transform: 'translateX(-200%)'
      })),
      state('dislike', style({
        transform: 'translateX(200%)'
      })),
      transition('default => like', animate('300ms ease-in')),
      transition('default => dislike', animate('300ms ease-in')),
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
  counter: number = 0;
  subscription: Subscription;
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

  constructor(private courseService: CourseService, private likeService: LikeService) {
      
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
    this.subscription = this.likeService.getCounter().subscribe((count) => {
      this.counter = count;
    });      
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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
    this.likeService.incrementCounter(i);
    if(this.courses[i].state == 'default') this.courses[i].state = 'like';
    var course = this.courses.filter(function( obj ){
      if(obj.id == i) obj.state = 'in';
     });
  }

  onDislike(i){

    if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
    var course = this.courses.filter(function( obj ){
     if(obj.id == i) obj.state = 'out';
    });
  }
}