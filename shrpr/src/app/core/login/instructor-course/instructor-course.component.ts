import { Component, OnInit, ViewChild, ElementRef, NgModule, Renderer } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { ValidationService } from '../../../core/validation.service';

@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.css']
})
export class InstructorCourseComponent implements OnInit {

  
  
  instructorCourseForm: FormGroup;
  semesterInfoForm: FormGroup;
  semesterDetailForm: FormGroup;
  sessionArray: any[] = [];
  data: any = {};
  //sessionArray: Array<{sessionDate:string, startTime: string, endTime: string}>;
  //private sessionArray = new Array<{sessionDate:string}>();

  @ViewChild('panel') panel : ElementRef;
  @ViewChild('myForm') myForm: ElementRef;
  @ViewChild("search") public searchElementRef: ElementRef;
  

  slideNo: number = 1;
  lastSlideNo:number = 3;
  prevPos: string = '';
  nextPos:number = 0;
  goNext:boolean = false;
  
  courseStartTimeText:string;
  courseSessionNumber:number;
  courseDurationNumber:number;
  dt:Date;
  

  constructor(
    public renderer: Renderer,
    private fb: FormBuilder
  ) {
      
   }

  ngOnInit() {

    this.instructorCourseForm = this.fb.group({
      'courseTitleText': ['', Validators.required],
      'courseGroupSelect': ['', Validators.required],
      'courseCategorySelect': ['', Validators.required],
      'courseSubCategorySelect': ['', Validators.required],
      'courseDescriptionText': ['', [Validators.required, Validators.minLength(40)]]
    });  
    this.semesterInfoForm = this.fb.group({  
      'courseStartDateText': ['', Validators.required],
      'courseIteration' : ['', Validators.required],
      'courseStartTimeText': ['', Validators.required],
      'courseEndTimeText': [''],
      'courseSessionNumber': ['', Validators.required],
      'courseDurationNumber': ['', Validators.required],
      'courseLocationText': ['', Validators.required]
    });

    this.goNext = this.instructorCourseForm.valid;
    this.semesterDetailForm = new FormGroup({  
      
    });

  }

  nextSlide(){
    if(this.slideNo == 1){
      this.instructorCourseSubmit();
    }
    if(this.slideNo == 2){
      this.sessionDetailsinit();
    }
    if( this.slideNo > 0 && this.slideNo < this.lastSlideNo ){
      this.slideNo++;
      this.renderer.setElementStyle(
      this.panel.nativeElement, 
      'transform', 
      'translateX(-' + String((this.slideNo-1) * 100) + '%)');
    }
  }
  prevSlide(){
      if( this.slideNo >= 2 ){
        this.slideNo--;
        this.renderer.setElementStyle(
        this.panel.nativeElement, 
        'transform', 
        'translateX(-' + String((this.slideNo-1) * 100) + '%)');
      }
      else{
        this.renderer.setElementStyle(
          this.panel.nativeElement, 
          'transform', 
          'translateX(0px)');
      }
    }

    instructorCourseSubmit() {

      this.data.courseTitleText = this.instructorCourseForm.value.courseTitleText;
      this.data.courseGroupSelect = this.instructorCourseForm.value.courseGroupSelect;
      this.data.courseCategorySelect = this.instructorCourseForm.value.courseCategorySelect;
      this.data.courseSubCategorySelect = this.instructorCourseForm.value.courseSubCategorySelect;
      this.data.courseDescriptionText = this.instructorCourseForm.value.courseDescriptionText;
      console.log(
        'Course Name :' + this.data.courseTitleText,
        'Group :' + this.data.courseGroupSelect,
        'Category :' + this.data.courseCategorySelect,
        'Sub Category :' + this.data.courseSubCategorySelect,
        'Description :' + this.data.courseDescriptionText
      )
    }  
  
  sessionDetailsinit(){
    
    if(this.sessionArray.length !== 0) {
        this.sessionArray = [];
    }

    let courseStartDateText = this.semesterInfoForm.value.courseStartDateText;
    let courseIteration = this.semesterInfoForm.value.courseIteration;
    let courseStartTimeText = this.semesterInfoForm.value.courseStartTimeText;
    
    let courseEndTimeText = this.semesterInfoForm.value.courseEndTimeText;
    this.courseSessionNumber = this.semesterInfoForm.value.courseSessionNumber;
    let courseDurationNumber = this.semesterInfoForm.value.courseDurationNumber;
    let courseLocationText = this.semesterInfoForm.value.courseLocationText;
    
    courseStartTimeText = moment(courseStartTimeText+':00', 'hh:mm:ss a');
    courseStartTimeText = moment(courseStartTimeText).format('HH:MM');

    courseEndTimeText = moment(courseStartTimeText, 'LT').add(courseDurationNumber, 'hours');
    
    courseEndTimeText = moment(courseEndTimeText).format('HH:MM');
    
    courseStartDateText = moment(courseStartDateText).format('YYYY-MM-DD');

    this.sessionArray.push(
      {
        "sessionDate" : courseStartDateText, 
        "startTime" : courseStartTimeText, 
        "endTime" : courseEndTimeText
      }
    );
    
    for(var i = 0; i < this.courseSessionNumber-1; i++){
      courseStartDateText = moment(courseStartDateText, 'YYYY-MM-DD').add(1, courseIteration).calendar();
      courseStartDateText = moment(courseStartDateText).format('YYYY-MM-DD');
      this.sessionArray.push(
        {
        "sessionDate" : courseStartDateText, 
        "startTime" : courseStartTimeText, 
        "endTime" : courseEndTimeText
        }
      );
      
    }
    console.log(this.sessionArray);
  }  

    
  }



