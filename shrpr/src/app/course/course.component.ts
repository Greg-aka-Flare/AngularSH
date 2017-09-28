import { Component, OnInit, Input } from '@angular/core';
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
  editing = false;
  editValue = '';

  constructor(private courseService: CourseService) { }

  ngOnInit() {
  }

  onEdit(){
  	this.editing = true;
  	this.editValue = this.course.name;
  }

  onUpdate(){
  	this.courseService.updateCourse(this.course.id, this.editValue)
  		.subscribe(
  			(course: Course) => {
  				this.course = course;
  				this.editValue = '';
  			}
  		);
  	
  	this.editing = false;
  }

  onCancel(){
  	this.editValue = '';
  	this.editing = false;
  }

  onDelete(){
  	this.courseService.deleteCourse(this.course.id)
  		.subscribe(
  			() => console.log('Course deleted')
  		);
  }

}
