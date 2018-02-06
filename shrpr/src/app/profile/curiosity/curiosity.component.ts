import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CuriousService } from "../../core/curious.service";
import { User } from '../../core/user.interface';
import { Course } from "../../courses/course.interface";
import { CourseService } from "../../courses/course.service";
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-curiosity',
  templateUrl: './curiosity.component.html',
  styleUrls: ['./curiosity.component.css']
})
export class CuriosityComponent implements OnInit, OnDestroy {
  @Input('user') user: User;

  allCourses: Course[];
  courses: Course[];
  counter:number = 0;

  constructor(
    private curious: CuriousService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    
    this.courseService.getLikeCourse().subscribe(courses => {
      this.allCourses = courses;

      if(this.allCourses){
        for(var j = this.counter, l = this.allCourses.length; j < l; j=j)
        {
          this.courses.push(this.allCourses[j]);
          j++;
          if(j%6 == 0) break;
        }
        this.counter += 6;
      }
     });


  }
  removeLike(course, i) {

    this.curious.dislike(course.id).subscribe(
        success => {
          //add new course
          console.log('removed');
        },
        error => {
          //log error
          console.log(error);
        }
      );
    
  }
  getData(){
    for(var k = this.counter, p = this.allCourses.length; k < p; k=k)
    {
      
      this.courses.push(this.allCourses[k]);
      
      k++;
    if(k%6 == 0) break;
    }
    this.counter+=6;
  }
  ngOnDestroy(){

  }

}
