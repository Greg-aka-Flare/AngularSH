import { Component, OnInit, OnDestroy, NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from "../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddCourseComponent } from './add-course/add-course.component';

import { Course } from "../courses/course.interface";
import { CourseService } from "../courses/course.service";
import { Instructor } from "./instructor.interface";
import { InstructorService } from "./instructor.service";
import { AuthService } from './../auth/auth.service';
import { ValidationService } from '../core/validation.service';
import { ControlMessagesComponent } from '../shared/control-messages/control-messages.component';


@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})

export class InstructorComponent implements OnInit, OnDestroy {
  instructors:any;
  courses: any;
  courseCard:any[] = [];
  private myid:number;
  reviewCount:number;
  ratingData:any;
  reviewRating:number;
  userRating:number = 0;
  loopCounter:number = 0;
  reviewRatingGross:number;
  ratingDataParse:any;
  //subscription: Subscription;
  private subscriptions = new Subscription();
  instrocterdata:string;
  courseCardLength:number;
  reviewshowHide:boolean = false;
  instructorCourse:any[]=new Array();
  counter:number = 0;
  loggedIn: boolean = false;
  details:any;
  showDialog:boolean;
  showDialogform:boolean = false;
  instrocterAddressForm: any;
  instrocterProfileForm: any;
  instrocterDescriptionForm:any;
  isEdit:boolean = false;
  isEditAbout:boolean = false;
  data: any = {};
  contactData: any = {};
  aboutData: any = {};
  email: string = '';
  description: string = '';
  
  width = document.documentElement.clientWidth;
  goTo(location: string): void {
    window.location.hash = location;
  }
  constructor(
    private instructorService: InstructorService, 
    private route: ActivatedRoute, 
    private courseService: CourseService,  
    private auth: AuthService,
    private fb: FormBuilder
  ) { 

    let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.myid = params['id'];
    }))
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;

    }));

    this.showDialog = false;
    
  }
  onChange(event) {
    var files = event.srcElement.files;
    console.log(files);
}
  ngOnInit() {
    this.loggedIn = this.auth.loggedIn();
    this.subscriptions.add(this.courseService.getCourses()
    .subscribe(
      (courses) => {
       this.courses = courses;
       if(this.courses){
        for(let i = 0; i < this.courses.length; i++) {
          if( this.courses[i].instructor.id == this.myid){
              this.courseCard.push(this.courses[i]);
          } 
        }
        for(var j = this.counter, l = this.courses.length; j < l; j=j)
        {
          if(this.courseCard[j]){
            this.instructorCourse.push(this.courseCard[j]);
          }
          j++;
          if(j%3 == 0) break;
        }
        this.counter += 3;
      }
      },
      (error: Response) => console.log(error)
      
    ));

    

    this.subscriptions.add(this.instructorService.getInstructor(this.myid)
     .subscribe(
       (instructors) => {

        this.instructors = instructors;
        this.ratingData = this.instructors.ratings;
        this.details = JSON.parse(instructors.details);
        this.reviewCount = this.ratingData.length;
        this.loopCounter = this.reviewCount+1;
        for(var k=0; k < this.reviewCount; k++){
            this.userRating += this.ratingData[k].rating;
        }
        this.reviewRatingGross = this.userRating/this.reviewCount;
        },
       (error: Response) => console.log(error)
     ));


     //if localstorage exists, pull values in
    if(localStorage.getItem('email')) this.email = localStorage.getItem('email');
    

    this.instrocterAddressForm = this.fb.group({
      'addressPhone': ['', [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'addressEmail': [this.email, [Validators.required, ValidationService.emailValidator]]
    });
    
    this.instrocterProfileForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'profileImage': [''],
      'url':  [''],
      'yelp':  [''],
      'twitter': [''],
      'facebook': [''],
      'linkedIn': [''],
      'pinterest': [''],
    });
    this.instrocterDescriptionForm = this.fb.group({
      'description': ['', [Validators.required, Validators.minLength(40)]],
    });
     
  }
  
  getData(){
    for(var k = this.counter, p = this.courses.length; k < p; k=k)
    {
      if(this.courseCard[k]){
      this.instructorCourse.push(this.courseCard[k]);
      }
      k++;
    if(k%3 == 0) break;
    }
    this.counter+=3;
  }
  updateAddress(){
    this.isEdit= !this.isEdit;
    
    let formAddress: any = {};
    
    //assign user data
    this.contactData.addresses = formAddress;
    
    this.contactData.phone = this.instrocterAddressForm.value.addressPhone;
    this.contactData.email = this.instrocterAddressForm.value.addressEmail;

    console.log(this.contactData)

  }


  updateProfile(){
    //this.isUpdate= !this.isUpdate;
    
    let detailsText: any = {};


    this.data.name = this.instrocterProfileForm.value.name;
    this.data.profile_img = this.instrocterProfileForm.value.profileImage;

    detailsText.url = this.instrocterProfileForm.value.yelp;
    detailsText.yelp = this.instrocterProfileForm.value.yelp;
    detailsText.twitter = this.instrocterProfileForm.value.twitter;
    detailsText.facebook = this.instrocterProfileForm.value.facebook;
    detailsText.linkedIn = this.instrocterProfileForm.value.linkedIn;
    detailsText.pinterest = this.instrocterProfileForm.value.pinterest;

    this.data.details = detailsText;

    console.log(this.data);
    this.showDialogform = !this.showDialogform;
    
  }

  updateinstrocterDescription(){
    this.isEditAbout= !this.isEditAbout;
    let descriptionText: any = {};
    descriptionText.description = this.instrocterDescriptionForm.value.description;
    this.aboutData.details = descriptionText;

    console.log(this.aboutData);

  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}