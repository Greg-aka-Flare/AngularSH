import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Course } from "../courses/course.interface";
import { CourseService } from "../courses/course.service";
import { AddreviewComponent } from "../shared/add-a-review/addreview.component";
import { Student } from "../student/student.interface";
import { StudentService } from '../student/student.service';
import { InlineEditComponent } from '../shared/inline-edit/inline-edit.component';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {

  students:any[];
  courses: any[];
  studentCourse:any;
  courseCard: any[] = [];
  private id:number;
  reviewshowHide:boolean = false;
  //subscription: Subscription;
  private subscriptions = new Subscription();
  

  width = document.documentElement.clientWidth;
  constructor(private studentService: StudentService, private route: ActivatedRoute, private courseService: CourseService ) {
    
        /*let sub = this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        })*/
        let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          }))
          
        const $resizeEvent = Observable.fromEvent(window, 'resize')
        .map(() => {
          return document.documentElement.clientWidth;
          })
          this.subscriptions.add($resizeEvent.subscribe(data => {
          this.width = data;
        }));
      }
      onChange(event) {
        var files = event.srcElement.files;
        console.log(files);
    }
  ngOnInit() {
    this.subscriptions.add(this.studentService.getStudent(this.id)
    .subscribe(
          (response) => {
            this.students = response;
            //this.studentCourse = JSON.parse(response.courses);
            //console.log(this.students);
          },
          (error: Response) => console.log(error)
        ));
    }

    ngOnDestroy(){
      this.subscriptions.unsubscribe();
    }
    

}
