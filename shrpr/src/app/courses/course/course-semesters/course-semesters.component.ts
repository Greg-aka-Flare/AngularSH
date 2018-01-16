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
      })

    }));
    //this.course = this.courseComponent.course;
    
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
