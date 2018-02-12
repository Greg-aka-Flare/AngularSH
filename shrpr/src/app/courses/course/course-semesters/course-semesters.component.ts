import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { CourseService } from '@app/core';


@Component({
  selector: 'app-course-semesters',
  templateUrl: './course-semesters.component.html',
  styleUrls: ['./course-semesters.component.css']
})
export class CourseSemestersComponent implements OnInit, OnDestroy {

  private id: number;
  @Input('course') course: any;
  private subscriptions = new Subscription();
  courseSemester:any[] = [];
  semesters:any[]=new Array();
  semesterLength:number;
  counter:number = 0;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    //subscribe the param value
    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      //get param
      this.id = params['id'];
      //subscribe the course using the course id which is get from param
      this.courseService.getCourse(this.id).subscribe(course => {
        //fill the course array with response
        this.course = course;
        //get all semesters of the course
        this.courseSemester = this.course.semesters;
        //get the total semesters number
        this.semesterLength = this.courseSemester.length;
        //fill semesters array with bunch of three courses
        if(this.course){
          for(var j = this.counter, l = this.semesterLength; j < l; j=j)
          {
            this.semesters.push(this.courseSemester[j]);
            j++;
            if(j%3 == 0) break;
          }
          this.counter += 3;
        }

      })

    }));
    
  }
//function to work on view more button
  getData(){
    for(var k = this.counter, p = this.semesterLength; k < p; k=k)
    {
      
      this.semesters.push(this.courseSemester[k]);
      
      k++;
    if(k%3 == 0) break;
    }
    this.counter+=3;
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
