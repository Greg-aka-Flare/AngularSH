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
import { ControlMessagesComponent } from '../shared/control-messages.component';

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
  studentAddressForm: any;
  private id:number;
  data: any = {};
  reviewshowHide:boolean = false;
  isEdit:boolean = false;
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

    this.studentAddressForm = this.fb.group({
      'addressType': [null, Validators.required, ValidationService],
      'addressStreet': [null, [Validators.required, Validators.email, ValidationService.emailValidator]],
      'addressCity': [null, Validators.required],
      'addressState': [null, Validators.required],
      'addressZip': [null, Validators.required],
      'addressCountry': [null, Validators.required],
      'addressPhone': [null, Validators.required],
      'addressEmail': [null, Validators.required]
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
      this.data.addressType = this.studentAddressForm.value.addressType;
      this.data.addressStreet = this.studentAddressForm.value.addressStreet;
      this.data.addressCity = this.studentAddressForm.value.addressCity;
      this.data.addressState = this.studentAddressForm.value.addressState;
      this.data.addressZip = this.studentAddressForm.value.addressZip;
      this.data.addressCountry = this.studentAddressForm.value.addressCountry;
      this.data.addressPhone = this.studentAddressForm.value.addressPhone;
      this.data.addressEmail = this.studentAddressForm.value.addressEmail;

      console.log(
        'Address Type :' + this.data.addressType,
        'Street :' + this.data.addressStreet,
        'City :' + this.data.addressCity,
        'State :' + this.data.addressState,
        'Zip :' + this.data.addressZip,
        'Country :' + this.data.addressCountry,
        'Phone :' + this.data.addressPhone,
        'Email :' + this.data.addressEmail
      )

    }

    ngOnDestroy(){
      this.subscriptions.unsubscribe();
    }
    

}
