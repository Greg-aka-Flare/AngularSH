import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Response } from "@angular/http";

import { Course } from '../../../courses/course.interface';
import { CourseService } from '../../../courses/course.service';
import { LikeService } from '../../like.service';
import { Subscription } from 'rxjs/Subscription';
import { StarRatingModule } from 'angular-star-rating';

 
@Component({
  selector: 'app-curious-mobile',
  templateUrl: './curious-mobile.component.html',
  styleUrls: ['./curious-mobile.component.css'],
  animations: [
    trigger('cardSwipe', [
      state('like', style({
        transform: 'translateX(200%)'
      })),
      state('dislike', style({
        transform: 'translateX(-200%)'
      })),
      transition('default => like', animate('300ms ease-in')),
      transition('default => dislike', animate('300ms ease-in')),
    ]),
    trigger('overlay', [
      state('like', style({
        backgroundColor: 'rgba(40, 233, 59, 0.2)'
      })),
      state('dislike', style({
        backgroundColor: 'rgba(233, 40, 40, 0.2)'
      })),
      transition('void => *', [
        style({
          opacity:0.5
        }),
        animate(100)
      ])
    ])
  ]
})

export class CuriousMobileComponent implements OnInit {

  courses: Course[];
  counter: number = 0;
  colorState: string;
  //subscription: Subscription;
  private subscriptions = new Subscription();

  editing = false;
  editValueName = '';
  editValueAddress = '';
  editValueCity = '';
  editValueState = '';
  editValueZip = '';
  isBtnActive: boolean = true;
  constructor(
    private courseService: CourseService, 
    private likeService: LikeService
  ) {}
  toggleClass() {
    this.isBtnActive = false;
  }
  ngOnInit() {


    this.subscriptions.add(this.courseService.getCourses(0, 10).subscribe(courses => {
      this.courses = courses;
    }));

    this.subscriptions.add(this.likeService.getCounter().subscribe((count) => {
      this.counter = count;
    }));
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  onEdit(){
    // this.editing = true;
    // this.editValueName = this.course.title;
    // this.editValueAddress = this.course.address;
    // this.editValueCity = this.course.city;
    // this.editValueState = this.course.state;
    // this.editValueZip = this.course.zip;
  }

  onUpdate(){
    // this.courseService.updateCourse(this.course.id, this.editValueName)
    //   .subscribe(
    //     (course: Course) => {
    //       this.course.title = this.editValueName;
    //       this.course.address = this.editValueAddress;
    //       this.course.city = this.editValueCity;
    //       this.course.state = this.editValueState;
    //       this.course.zip = this.editValueZip;
    //     }
    //   );
    
    // this.editing = false;
  }

  onCancel(){
    // this.editValueName = '';
    // this.editing = false;
  }

  onDelete(){
    // this.courseService.deleteCourse(this.course.id)
    //   .subscribe(
    //     () => {
    //       this.courseDeleted.emit(this.course);
    //       console.log('Course deleted');
    //     }
    //   );
  }

  onLike(i, k){
    this.likeService.likeCounter(i);
    //if(this.courses[i].state == 'default') this.courses[i].state = 'like';
    var course = this.courses.filter(function( obj ){
      if(obj.id == i) obj.state = 'like';
    });
  }

  onDislike(i, k){
    this.likeService.dislikeCounter(i);
    //if(this.courses[i].state == 'default') this.courses[i].state = 'dislike';
    var course = this.courses.filter(function( obj ){
      if(obj.id == i) obj.state = 'dislike';
    });
  }
}