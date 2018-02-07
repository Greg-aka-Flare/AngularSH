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

  allCourses: any[];
  mycourses: Course[] = [];
  filtercourses: Course[] = [];
  counter:number = 0;
  private subscriptions = new Subscription();
  selectedIndex:number;
  
  constructor(
    private curious: CuriousService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    
    this.subscriptions.add(this.courseService.getLikeCourse().subscribe(courses => {
      this.allCourses = courses;
      this.filtercourses = courses;
      this.allCourseInit();
      
     }));
  }

  allCourseInit(){
    this.counter = 0;
    if(this.filtercourses){
      for(var j = 0, l = this.filtercourses.length; j < l; j=j)
      {
        this.mycourses.push(this.filtercourses[j]);
        j++;
        if(j%6 == 0) break;
      }
      this.counter += 6;

    }
  }

removeLike(course, i) {
  this.subscriptions.add(this.curious.dislike(course.id).subscribe(
        success => {
          //add new course
          console.log('removed');
        },
        error => {
          //log error
          console.log(error);
        }
      ));
}
  getData(){
    for(var k = this.counter, p = this.filtercourses.length; k < p; k=k)
    {
      this.mycourses.push(this.filtercourses[k]);
      k++;
    if(k%6 == 0) break;
    }
    this.counter+=6;
  }

  sortbyGroup(id: number) {
    this.selectedIndex = id;
    this.mycourses = [];
    this.filtercourses = [];
    this.filtercourses = this.allCourses;

    this.filtercourses = this.filtercourses.filter((course: any) => course.group.id === id);
      this.allCourseInit();
    }
  
    ngOnDestroy(){
      this.subscriptions.unsubscribe();
  }

}
