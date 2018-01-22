import { Component, OnInit, OnDestroy, Input, Pipe, PipeTransform } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { ActivatedRoute, Params } from '@angular/router';
import { TabsComponent } from "../../shared/tabs/tabs.component";
import { AddreviewComponent } from "../../shared/add-a-review/addreview.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

import { Course } from "../course.interface";
import { CourseService } from "../course.service";
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit, OnDestroy {

  private id: number;
  course: any;
  semesterDetails:string;
  primaryImg:string;
  secondaryImg:string;
  reviewCount:number;
  ratingData:any;
  reviewRating:number;
  userRating:number = 0;
  loopCounter:number = 0;
  reviewRatingGross:number;
  ratingDataParse:any;
  private subscriptions = new Subscription();
  width = document.documentElement.clientWidth;
  lat: number = 51.678418;
  lng: number = 7.809007;
  disableAutoPan: boolean;
  fullscreenControl: boolean;
  mapTypeControl: boolean;
  meetingArray:any;
  public startDate: Date;
  public endDate: Date;
  semesterCount:number;
  semesterArray: any[] = [];
  semesters:any[]=new Array();
  selectedSemester:any;
  selectedSemesterMettings:number;
  categoriesArray:any;
  semesterInfo;
  reviewshowHide:boolean = false;
  loggedIn: boolean = false;
  booking: boolean = false;
  isBooked: boolean = false;
  showBookBtn: boolean = false;
  counter:number = 0;
  semesterParam:number;
  currentIndex:number = 0;

  //The time to show the next photo
  private NextPhotoInterval:number = 5000;
  //Looping or not
  private noLoopSlides:boolean = false;
  //Photos
  private slides:Array<any> = [];
  firstSemester:number; 
  goTo(location: string): void {
    window.location.hash = location;
  }
  constructor(
    private courseService: CourseService, 
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.selectedSemester = this.semesterArray;
    
    
  }

  ngOnInit() {
    
    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(params['semester_id']){
        this.semesterParam = params['semester_id'];
      }
      
      this.courseService.getCourse(this.id).subscribe(course => {
      this.course = course;
      this.ratingData = this.course.ratings;
      this.categoriesArray = this.course.categories;
      this.semesterCount = this.course.semesters.length;
      this.semesterArray.pop();
      for(var i=0; i< this.semesterCount; i++){
        this.semesterArray.push(this.course.semesters[i]);
      }
      if(this.semesterParam){
          for(var p = 0, q = this.semesterCount; p < q; p++)
          {
            if(this.semesterArray[p].id == this.semesterParam){
              this.currentIndex = p;
            }
          }
      }
      else{
        this.currentIndex = 0;
      }
     // console.log('current index is : ' + this.currentIndex);

      if(this.course){
        for(var j = this.counter, l = this.semesterCount; j < l; j=j)
        {
          this.semesters.push(this.semesterArray[j]);
          j++;
          if(j%3 == 0) break;
        }
        this.counter += 3;
      }

      
      

      
      this.semesterDetails = JSON.parse(this.course.semesters[this.currentIndex].details);
      this.startDate = new Date(this.course.semesters[this.currentIndex].start_date.replace(/-/g, "/"));
      this.endDate = new Date(this.course.semesters[this.currentIndex].end_date.replace(/-/g, "/"));
       
      if(this.slides.length > 0){
        for(var i=0, j = this.slides.length; i < j; i++){
          this.slides.pop();
        }
      }
      
      this.primaryImg = this.course.semesters[this.currentIndex].primary_img;
      this.secondaryImg = JSON.parse(this.course.semesters[this.currentIndex].details).secondary_img;
      this.slides.push(
        {image:'../../assets/img/courses/'+ this.primaryImg},
        {image:'../../assets/img/courses/'+ this.secondaryImg}
        //{image:'../../assets/img/court.jpg'},
        //{image:'../../assets/img/court-two.jpg'}
      );

      this.meetingArray = this.course.semesters[this.currentIndex].meetings;
      this.selectedSemesterMettings =  this.meetingArray.length;
      this.onSelect(this.course.semesters[this.currentIndex].id);
      
      //initializing the google co-ordinates
      this.lat = this.course.semesters[this.currentIndex].addresses[0].latitude;
      this.lng = this.course.semesters[this.currentIndex].addresses[0].longitude;
      
      this.reviewCount = this.ratingData.length;
      this.loopCounter = this.reviewCount+1;
      for(var k=0; k < this.reviewCount; k++){
          this.userRating += this.ratingData[k].rating;
      }
      this.reviewRatingGross = this.userRating/this.reviewCount;
    
      //check if logged in
      this.loggedIn = this.auth.loggedIn();

      //if logged in, get user
      if(this.loggedIn) {

        this.auth.me().subscribe(me => { 

          //check if booked for course
          this.checkBooked(me); 

          //show button
          this.showBookBtn = true;
        });
      }
      else{

          //show button
          this.showBookBtn = true;
      }
    })

    }))
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
      
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;
    }));

    //this.subscriptions.add();
  }
  
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  onSelect(val){
    this.selectedSemester = this.semesterArray.filter(x => x.id == val);
    this.selectedSemesterMettings = this.selectedSemester[0].meetings.length;

  }
 
  private removeLastSlide() {
    this.slides.pop();
  }

  
  book() {

    //open pop-up
    this.booking = true;
  }

  booked(value: boolean) {

    //set if booked or not
    this.isBooked = value;

    //close pop-up
    this.booking = false;
  }

  checkBooked(me: any) {

    if(me.student) { //if student

      //check if has courses
      if(me.student.courses.length) {

        //for every course, check if id matches current id
        for(let course of me.student.courses){

          if(course.id == this.id){ //if id matches

            //already booked
            this.isBooked = true;

            //exit loop
            break;
          }
        }
      }
    }
  }
}