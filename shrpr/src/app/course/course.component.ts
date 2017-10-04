import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Response } from "@angular/http";

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
 
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() courseDeleted = new EventEmitter<Course>();
  editing = false;
  editValueName = '';
  editValueAddress = '';
  editValueCity = '';
  editValueState = '';
  editValueZip = '';

  constructor(private courseService: CourseService) { }

  ngOnInit() {
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



}
