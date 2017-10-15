import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
 
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
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
      transition('default => dislike', animate('300ms ease-in'))
    ])
  ]
})

export class CourseComponent implements OnInit {
  courses: any[];

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
        (courses: any[]) => {
          this.courses = courses;

          for (var i = 0, l = courses.length; i < l; i++) {

            courses[i].state = 'default';
          }
        },
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

  onLike(i){

    console.log('test');

    if(this.courses[i].state == 'default') this.courses[i].state = 'like';
  }

  onDislike(i){

    if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
  }
}