import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { TabsComponent } from "../../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';

import { Subscription } from 'rxjs/Subscription';
import { AddCourseInstructorComponent } from './add-course-instructor/add-course-instructor.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Instructor } from "../../instructors/instructor.interface";
import { InstructorService } from "../../instructors/instructor.service";
import { Course } from "../../courses/course.interface";
import { CourseService } from "../../courses/course.service";

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';
import { User } from '../../core/user.interface';

@Component({
  selector: 'profile-instructor',
  templateUrl: './profile-instructor.component.html',
  styleUrls: ['./profile-instructor.component.css']
})

export class ProfileInstructorComponent implements OnInit, OnDestroy {

  @Input('user') user: User;

  courses: any;
  courseCard:any[] = [];
  instructors: Instructor;
  //private myid:number;
  reviewCount:number;
  ratingData:any;
  reviewRating:number;
  userRating:number = 0;
  loopCounter:number = 0;
  reviewRatingGross:number;
  ratingDataParse:any;
  
  private subscriptions = new Subscription();
  instrocterdata:string;
  courseCardLength:number;
  reviewshowHide:boolean = false;
  instructorCourse:any[]=new Array();
  counter:number = 0;
  paramChild:string;
  addCourse:boolean = false;
  
  
  
  addressForm: FormGroup;
  profileForm: FormGroup;
  descriptionForm: FormGroup;
  showProfile: boolean = false;
  showAddress: boolean = false;
  showAbout: boolean = false;
  
  constructor(
    private instructor: InstructorService, 
    private courseService: CourseService,  
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {



    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      if(params['open']){
        this.paramChild = params['open'];
        if(this.paramChild == 'add-course'){
          this.addCourse = true;
        }
      }
      console.log(this.user);
      

    }));

    //if no addresses
    if(this.user.instructor.addresses.length === 0){

      //create empty
      this.user.instructor.addresses.push({
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      });

      //if localstorage exists, pull values in
      if(localStorage.getItem('useCurrentLocation')) {
        if(localStorage.getItem('address')) this.user.instructor.addresses[0].streetAddress = localStorage.getItem('address');
        if(localStorage.getItem('city')) this.user.instructor.addresses[0].city = localStorage.getItem('city');
        if(localStorage.getItem('state')) this.user.instructor.addresses[0].state = localStorage.getItem('state');
        if(localStorage.getItem('zip')) this.user.instructor.addresses[0].zip = localStorage.getItem('zip');
        if(localStorage.getItem('country')) this.user.instructor.addresses[0].country = localStorage.getItem('country');
      }
    }
    this.instructors = this.user.instructor;
    //if no details, fill in empty data
    if(!this.user.instructor.details) {

      this.user.instructor.details = {
        description: '',
        url: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        yelp: '',
        pinterest: '',
        secondary_email: ''
      }
    }

    //create form groups
    this.addressForm = this.fb.group({
      'addressStreet': [this.user.instructor.addresses[0].streetAddress, Validators.required],
      'addressCity': [this.user.instructor.addresses[0].city, Validators.required],
      'addressState': [this.user.instructor.addresses[0].state, Validators.required],
      'addressZip': [this.user.instructor.addresses[0].zip, Validators.required],
      'addressCountry': [this.user.instructor.addresses[0].country, Validators.required],
      'addressPhone': [this.user.instructor.phone, [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'addressEmailSecondary': [this.user.instructor.details.secondary_email, [Validators.required, ValidationService.emailValidator]]
    });
  
    this.profileForm = this.fb.group({
      'name': [this.user.name, [Validators.required, ValidationService.alphabetsValidator]],
      'profileImage': [this.user.profile_img],
      'url':  [this.user.instructor.details.url],
      'twitter': [this.user.instructor.details.twitter],
      'facebook': [this.user.instructor.details.facebook],
      'linkedin': [this.user.instructor.details.linkedin],
      'yelp':  [this.user.instructor.details.yelp],
      'pinterest': [this.user.instructor.details.pinterest],
    });

    this.descriptionForm = this.fb.group({
      'description': [this.user.instructor.details.description, [Validators.required, Validators.minLength(40)]],
    });

    this.subscriptions.add(this.courseService.getCourses()
    .subscribe(
      (courses) => {
       this.courses = courses;
       if(this.courses){
        for(let i = 0; i < this.courses.length; i++) {
          if( this.courses[i].instructor.id == this.user.id){
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

    
     
  }
  goTo(location: string): void {
    window.location.hash = location;
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

    //create data
    const data = {
      phone: this.addressForm.value.addressPhone,
      addresses: [ {
        type: 'primary',
        streetAddress: this.addressForm.value.addressStreet,
        city: this.addressForm.value.addressCity,
        state: this.addressForm.value.addressState,
        zip: this.addressForm.value.addressZip,
        country: this.addressForm.value.addressCountry
      } ],
      details: {
        secondary_email: this.addressForm.value.addressEmailSecondary
      }
    };

    //save data
    this.instructor.save(data).subscribe(
      success => {
        //update data
        this.user.instructor.phone = data.phone;
        this.user.instructor.addresses = data.addresses;
        this.user.instructor.details = {...this.user.instructor.details, ...data.details};

        //hide popup
        this.showAddress = !this.showAddress;
      }
    );
  }

  updateProfile(){

    //create data
    const data = {
      name: this.profileForm.value.name,
      profile_img: this.profileForm.value.profileImage,
      details: {
        url: this.profileForm.value.url,
        yelp: this.profileForm.value.yelp,
        twitter: this.profileForm.value.twitter,
        facebook: this.profileForm.value.facebook,
        linkedin: this.profileForm.value.linkedin,
        pinterest: this.profileForm.value.pinterest
      }
    };

    //save data
    this.instructor.save(data).subscribe(
      success => {
        //update data
        this.user.name = data.name;
        this.user.profile_img = data.profile_img;
        this.user.instructor.details = {...this.user.instructor.details, ...data.details};

        //hide popup
        this.showProfile = !this.showProfile;
      }
    );
  }

  updateDescription(){

    //create data
    const data = {
      details: {
        description: this.descriptionForm.value.description
      }
    };

    //save data
    this.instructor.save(data).subscribe(
      success => {
        //update data
        this.user.instructor.details = {...this.user.instructor.details, ...data.details};

        //hide popup
        this.showAbout = !this.showAbout;
      }
    );
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}