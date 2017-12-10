import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Course } from "../course.interface";
import { CourseService } from "../course.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

	private courses: Course[];
  private title: string = 'All Courses';
  private group: string = 'all';

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private courseService: CourseService
  ) { }

  ngOnInit() {

    //get params
    this.route.params.subscribe((params) => {

      let id: number = 0;

      //find group id
      switch(params.group) {

        case 'for-fun':
          this.title = 'For Fun';
          id = 1;
          break;

        case 'for-work':
          this.title = 'For Work';
          id = 2;
          break;

        case 'for-kids':
          this.title = 'For Kids';
          id = 3;
          break;
      }

      //set group if id is found
      if(id) this.group = params.group;

      //get courses
      this.courseService.getCourses(id).subscribe(courses => {

        //set courses
        this.courses = courses;
      });
    });
  }

}
