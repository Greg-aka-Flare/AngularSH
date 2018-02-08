import { Component, OnInit, OnDestroy, Input, Pipe, PipeTransform } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { CartService } from "../../payment/cart.service";
import { Course, CourseService } from '@app/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit, OnDestroy {

  course: Course;
  selectedCourse: Course;
  private subscriptions = new Subscription();
  lat: number = 51.678418;
  lng: number = 7.809007;
  selectedSemester:any;
  showReview: boolean = false;
  enrollPopup: boolean = false;
  cartAdded: boolean = false;

  private NextPhotoInterval: number = 5000;
  private noLoopSlides: boolean = false;
  private slides: Array<any> = [];

  constructor(
    private cart: CartService,
    private courseService: CourseService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  
    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.courseService.getCourse(params['id']).subscribe((course: Course) => {
        this.course = course;
         
        if(this.slides.length > 0){
          for(var i=0, j = this.slides.length; i < j; i++){
            this.slides.pop();
          }
        }
        
        this.slides.push(
          {image:'../../assets/img/courses/'+ this.course.semesters[0].primary_img},
          {image:'../../assets/img/courses/'+ JSON.parse(this.course.semesters[0].details).secondary_img}
        );

        this.onSelect(this.course.semesters[0].id);

        //initializing the google co-ordinates
        this.lat = this.course.semesters[0].addresses[0].latitude;
        this.lng = this.course.semesters[0].addresses[0].longitude;

        //check if already in cart
        this.cartAdded = this.cart.added(this.selectedCourse);
      });
    }));
  }
  
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  } 

  goTo(location: string): void {
    window.location.hash = location;
  }

  onSelect(val){
    this.selectedSemester = this.course.semesters.filter(x => x.id == val);

    this.selectedCourse = this.course;
    this.selectedCourse.semesters = this.selectedSemester;
  }
 
  private removeLastSlide() {
    this.slides.pop();
  }
  
  enroll() {

    //open pop-up
    this.enrollPopup = true;
  }

  addCart(value: boolean) {

    //set if added to cart or not
    this.cartAdded = value;

    //close enroll pop-up
    this.enrollPopup = false;
  }
}