import { Component, OnInit, OnDestroy } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { Student } from "../student.interface";
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students:any[];
  courses: any[];
  studentCourse:any[];
  courseCard: any[] = [];
  private id:number;
  subscription: Subscription;
  width = document.documentElement.clientWidth;
  constructor(private studentService: StudentService, private route: ActivatedRoute, private courseService: CourseService ) {
    
        let sub = this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        })
        const $resizeEvent = Observable.fromEvent(window, 'resize')
        .map(() => {
          return document.documentElement.clientWidth;
          })
        $resizeEvent.subscribe(data => {
          this.width = data;
        });
    
        
      }
   
  ngOnInit() {
    this.studentService.getStudent(this.id)
    .subscribe(
          (response) => {
            this.students = response;
            //this.studentCourse = response.courses;
            //console.log(this.students);
          },
          (error: Response) => console.log(error)
        );
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
    

}
