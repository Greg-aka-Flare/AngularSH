import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Course } from "../../courses/course.interface";
import { CourseService } from "../../courses/course.service";
import { AddreviewComponent } from "../../shared/add-a-review/addreview.component";
import { Student } from "../../student/student.interface";
import { StudentService } from '../../student/student.service';
import { InlineEditComponent } from '../../shared/inline-edit/inline-edit.component';
import {} from '@types/googlemaps';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';



@Component({
  selector: 'profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})

export class ProfileStudentComponent implements OnInit, OnDestroy {

  city: string = '';
  state: string = '';
  zip: string = '';
  country: string = '';
  address: string = '';
  email: string = '';
  description: string = '';
  students:any[];
  courses: any[];
  studentCourse:any;
  courseCard: any[] = [];
  studentAddressForm: any;
  studentProfileForm: any;
  studentDescriptionForm:any;
  private id:number;
  data: any = {};
  contactData: any = {};
  aboutData: any = {};

  showDialog:boolean = false;
  

  reviewshowHide:boolean = false;
  isEdit:boolean = false;
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
          this.studentService.getStudent(this.id)
          .subscribe(
                (response) => {
                  this.students = response;
                  //this.studentCourse = JSON.parse(response.courses);
                  //console.log(this.students);
                },
                (error: Response) => console.log(error)
              )

          }));
          
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
    if(localStorage.getItem('email')) this.email = localStorage.getItem('email');
    if(localStorage.getItem('useCurrentLocation') && localStorage.getItem('useCurrentLocation') === 'true'){
      if(localStorage.getItem('city')) this.city = localStorage.getItem('city');
      if(localStorage.getItem('state')) this.state = localStorage.getItem('state');
      if(localStorage.getItem('zip')) this.zip = localStorage.getItem('zip');
      if(localStorage.getItem('country')) this.country = localStorage.getItem('country');
      if(localStorage.getItem('address')) this.address = localStorage.getItem('address');
    }
    

    this.studentAddressForm = this.fb.group({
      'addressStreet': [this.address, Validators.required],
      'addressCity': [this.city, Validators.required],
      'addressState': [this.state, Validators.required],
      'addressZip': [this.zip, Validators.required],
      'addressCountry': [this.country, Validators.required],
      'addressPhone': ['', [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'addressEmail': [this.email, [Validators.required, ValidationService.emailValidator]]
    });
    
    this.studentProfileForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'profileImage': [''],
      'url':  [''],
      'yelp':  [''],
      'twitter': [''],
      'facebook': [''],
      'linkedIn': [''],
      'pinterest': [''],
    });
    this.studentDescriptionForm = this.fb.group({
      'description': ['', [Validators.required, Validators.minLength(40)]],
    });
}

    updateAddress(){
      this.isEdit= !this.isEdit;
      
      let formAddress: any = {};
      
      //assign user data
      formAddress.streetAddress = this.studentAddressForm.value.addressStreet;
      formAddress.city = this.studentAddressForm.value.addressCity;
      formAddress.state = this.studentAddressForm.value.addressState;
      formAddress.zip = this.studentAddressForm.value.addressZip;
      formAddress.country = this.studentAddressForm.value.addressCountry;

      this.contactData.addresses = formAddress;
      
      this.contactData.phone = this.studentAddressForm.value.addressPhone;
      this.contactData.email = this.studentAddressForm.value.addressEmail;

      console.log(this.contactData)

    }


    updateProfile(){
      //this.isUpdate= !this.isUpdate;
      
      let detailsText: any = {};


      this.data.name = this.studentProfileForm.value.name;
      this.data.profile_img = this.studentProfileForm.value.profileImage;

      detailsText.url = this.studentProfileForm.value.yelp;
      detailsText.yelp = this.studentProfileForm.value.yelp;
      detailsText.twitter = this.studentProfileForm.value.twitter;
      detailsText.facebook = this.studentProfileForm.value.facebook;
      detailsText.linkedIn = this.studentProfileForm.value.linkedIn;
      detailsText.pinterest = this.studentProfileForm.value.pinterest;

      this.data.details = detailsText;

      console.log(this.data);
      this.showDialog = !this.showDialog;
      
    }

    updatestudentDescription(){
      this.isEditAbout= !this.isEditAbout;
      let descriptionText: any = {};
      descriptionText.description = this.studentDescriptionForm.value.description;
      this.aboutData.details = descriptionText;

      console.log(this.aboutData);

    }


    ngOnDestroy(){
      this.subscriptions.unsubscribe();
    }
    

}
