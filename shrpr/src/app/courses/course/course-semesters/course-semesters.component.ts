import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';


import { CourseService } from '../../../courses/course.service';
import { CourseComponent } from '../../course/course.component';


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
    //private courseComponent: CourseComponent,
    private courseService: CourseService,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {
    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.courseService.getCourse(this.id).subscribe(course => {
        this.course = course;
        this.courseSemester = this.course.semesters;
        this.semesterLength = this.courseSemester.length;
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
    //this.course = this.courseComponent.course;
    
  }

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
