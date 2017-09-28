import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";


import { Course } from "../course.interface";
import { CourseService } from "../course.service"

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
  	this.courseService.addCourse(form.value.name)
  		.subscribe(
  			() => alert('Course created')
  		);
  	form.reset();
  }

}
