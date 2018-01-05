import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
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
import {} from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ValidationService } from '../core/validation.service';
import { ControlMessagesComponent } from '../shared/control-messages/control-messages.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit, OnDestroy {

  city: string = '';
  state: string = '';
  zip: string = '';
  country: string = '';
  students:any[];
  courses: any[];
  studentCourse:any;
  courseCard: any[] = [];
  studentAddressForm: any;
  studentProfileForm: any;
  studentDescriptionForm:any;
  private id:number;
  data: any = {};
  reviewshowHide:boolean = false;
  isEdit:boolean = false;
  isUpdate:boolean = false;
  isEditAbout:boolean = false;
  private mylocation:string;
  //subscription: Subscription;
  private subscriptions = new Subscription();
  //control: FormControl;

  width = document.documentElement.clientWidth;
  constructor(
    private studentService: StudentService, 
    private route: ActivatedRoute, 
    private courseService: CourseService,  
    private mapsAPILoader: MapsAPILoader,
    private fb: FormBuilder
  ) {

    
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

    //if localstorage exists, pull values in
    if(localStorage.getItem('city')) this.city = localStorage.getItem('city');
    if(localStorage.getItem('state')) this.state = localStorage.getItem('state');
    if(localStorage.getItem('zip')) this.zip = localStorage.getItem('zip');
    if(localStorage.getItem('country')) this.country = localStorage.getItem('country');

    this.studentAddressForm = this.fb.group({
      'addressStreet': ['', [Validators.required]],
      'addressCity': [this.city, Validators.required],
      'addressState': [this.state, Validators.required],
      'addressZip': [this.zip, Validators.required],
      'addressCountry': [this.country, Validators.required],
      'addressPhone': ['', [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'addressEmail': ['', [Validators.required, ValidationService.emailValidator]]
    });
    
    this.studentProfileForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'profileImage': [''],
      'yelp':  [''],
      'twitter': [''],
      'facebook': [''],
      'linkedIn': [''],
      'pinterest': [''],
    });
    this.studentDescriptionForm = this.fb.group({
      'description': ['', [Validators.required, Validators.minLength(40)]],
    });

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

    updateAddress(){
      this.isEdit= !this.isEdit;
      //assign user data
      this.data.addressStreet = this.studentAddressForm.value.addressStreet;
      this.data.addressCity = this.studentAddressForm.value.addressCity;
      this.data.addressState = this.studentAddressForm.value.addressState;
      this.data.addressZip = this.studentAddressForm.value.addressZip;
      this.data.addressCountry = this.studentAddressForm.value.addressCountry;
      this.data.addressPhone = this.studentAddressForm.value.addressPhone;
      this.data.addressEmail = this.studentAddressForm.value.addressEmail;

      console.log(
        'Street :' + this.data.addressStreet,
        'City :' + this.data.addressCity,
        'State :' + this.data.addressState,
        'Zip :' + this.data.addressZip,
        'Country :' + this.data.addressCountry,
        'Phone :' + this.data.addressPhone,
        'Email :' + this.data.addressEmail
      )

    }
    updateProfile(){
      this.isUpdate= !this.isUpdate;

      this.data.name = this.studentAddressForm.value.name;
      this.data.email = this.studentAddressForm.value.email;
      this.data.profileImage = this.studentAddressForm.value.profileImage;
      this.data.yelp = this.studentAddressForm.value.yelp;
      this.data.twitter = this.studentAddressForm.value.twitter;
      this.data.facebook = this.studentAddressForm.value.facebook;
      this.data.linkedIn = this.studentAddressForm.value.linkedIn;
      this.data.pinterest = this.studentAddressForm.value.pinterest;

      console.log(
        'Name :' + this.data.name,
        'Email :' + this.data.email,
        'Profile Image :' + this.data.profileImage,
        'Yelp :' + this.data.yelp,
        'Twitter :' + this.data.twitter,
        'Facebook :' + this.data.facebook,
        'LinkedIn :' + this.data.linkedIn,
        'Pinterest :' + this.data.pinterest
      )

    }
    updatestudentDescription(){
      this.isEditAbout= !this.isEditAbout;

      this.data.description = this.studentAddressForm.value.description;

      console.log(
        'Description :' + this.data.description,
      )

    }


    ngOnDestroy(){
      this.subscriptions.unsubscribe();
    }
    

}
