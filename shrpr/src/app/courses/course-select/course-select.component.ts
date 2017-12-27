import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { Course } from "../course.interface";
import { CourseService } from "../course.service";

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css']
})
export class CourseSelectComponent implements OnInit {

  allCourse: any;

  constructor(private http: HttpClient, private courseService: CourseService) { }

  ngOnInit() {
    let api = 'https://api.shrpr.co/api/courses';
    return this.http.get(api).subscribe(courses => {
        //set courses
        console.log(courses);
        this.allCourse = courses;
    });
    
  }

}
