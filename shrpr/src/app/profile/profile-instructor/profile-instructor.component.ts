import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from "../../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddCourseInstructorComponent } from './add-course-instructor/add-course-instructor.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Course } from "../../courses/course.interface";
import { CourseService } from "../../courses/course.service";
import { Instructor } from "../../instructors/instructor.interface";
import { InstructorService } from "../../instructors/instructor.service";
import { AuthService } from './../../auth/auth.service';
import { User } from '../../core/user.interface';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';

@Component({
  selector: 'profile-instructor',
  templateUrl: './profile-instructor.component.html',
  styleUrls: ['./profile-instructor.component.css']
})

export class ProfileInstructorComponent implements OnInit, OnDestroy {

  @Input('user') user: User;
  city: string = '';
  state: string = '';
  zip: string = '';
  country: string = '';
  address: string = '';
  email: string = '';
  description: string = '';
  instructor:any;
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
  paramChild:string;
  addCourse:boolean = false;
  instructorAddress:any = {};
  showDialogform:boolean = false;
  instrocterAddressForm: any;
  instrocterProfileForm: any;
  instrocterDescriptionForm:any;
  isEdit:boolean = false;
  isEditAbout:boolean = false;
  data: any = {};
  contactData: any = {};
  aboutData: any = {};
  
  width = document.documentElement.clientWidth;
  goTo(location: string): void {
    window.location.hash = location;
  }
  constructor(
    private instructorService: InstructorService, 
    private courseService: CourseService,  
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { 
    
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

    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      if(params['open']){
        this.paramChild = params['open'];
        if(this.paramChild == 'add-course'){
          this.addCourse = true;
        }
      }
      

    }));

    this.loggedIn = this.auth.loggedIn();
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

    this.subscriptions.add(this.instructorService.getInstructor(this.user.id)
     .subscribe(
       (instructor) => {

        this.instructor = instructor;
        this.ratingData = this.instructor.ratings;
        this.details = JSON.parse(instructor.details);
        this.reviewCount = this.ratingData.length;
        this.instructorAddress = instructor.addresses;
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
     if(localStorage.getItem('useCurrentLocation') && localStorage.getItem('useCurrentLocation') === 'true'){
       if(localStorage.getItem('city')) this.city = localStorage.getItem('city');
       if(localStorage.getItem('state')) this.state = localStorage.getItem('state');
       if(localStorage.getItem('zip')) this.zip = localStorage.getItem('zip');
       if(localStorage.getItem('country')) this.country = localStorage.getItem('country');
       if(localStorage.getItem('address')) this.address = localStorage.getItem('address');
     }
    

    this.instrocterAddressForm = this.fb.group({
      'addressStreet': [this.address, Validators.required],
      'addressCity': [this.city, Validators.required],
      'addressState': [this.state, Validators.required],
      'addressZip': [this.zip, Validators.required],
      'addressCountry': [this.country, Validators.required],
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