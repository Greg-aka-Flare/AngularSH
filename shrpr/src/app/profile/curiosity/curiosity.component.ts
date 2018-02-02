import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgZone } from '@angular/core';
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
export class CuriosityComponent implements OnInit {
  @Input('user') user: User;

  public dCourses: any[] = [];
  likeArray: number[] = [];
  //myCourse: Course[];
  lcourses: Course[];

  constructor(
    private zone: NgZone, 
    private curious: CuriousService,
    private courseService: CourseService

  ) { }

  ngOnInit() {

    let id:number = 0;
    this.likeArray = this.curious.likes;
    console.log(this.likeArray);
    this.courseService.getCourses(id).subscribe(courses => {
      //set courses
      //this.lcourses = courses;
      
      this.likeArray.forEach((item, i) => {
        this.lcourses = courses;
        let myCourses: Course[];
        myCourses = this.lcourses.filter((course: Course) => course.id === item);
        this.dCourses.push(myCourses);
      });
      console.log(this.dCourses);
      

    });
    
    
    
   
    
  }

}
