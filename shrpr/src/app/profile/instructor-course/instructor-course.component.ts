import { Component, OnInit, ViewChild, ElementRef, NgModule, Renderer } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.css']
})
export class InstructorCourseComponent implements OnInit {

  
  
  instructorCourseForm: FormGroup;
  private sessionArray = new Array<{sessionDate:string, startTime: string, endTime: string}>();
  //sessionArray: Array<{sessionDate:string, startTime: string, endTime: string}>;
  //private sessionArray = new Array<{sessionDate:string}>();

  @ViewChild('panel') panel : ElementRef
  
  slideNo: number = 1;
  lastSlideNo:number = 4;
  prevPos: string = '';
  nextPos:number = 0;
  
  courseStartTimeText:string;
  courseSessionNumber:number;
  courseDurationNumber:number;


  constructor(public renderer: Renderer) {
    
   }

  ngOnInit() {
    this.instructorCourseForm = new FormGroup({
      'courseGroupSelect': new FormControl(null, Validators.required),
      'courseCategorySelect': new FormControl(null, [Validators.required]),
      'courseSubCategorySelect': new FormControl(null, Validators.required),
      'courseTitleText': new FormControl(null, Validators.required),
      'courseDescriptionText': new FormControl(null, Validators.required),
      'courseStartDateText': new FormControl(null, Validators.required),
      'courseStartTimeText': new FormControl(null, Validators.required),
      'courseSessionNumber': new FormControl(null, Validators.required),
      'courseDurationNumber': new FormControl(null, Validators.required),
      'courseLocationText': new FormControl(null, Validators.required),
      'courseEndTimeText': new FormControl(null)
    });
  }

  nextSlide(){
    if(this.slideNo == 3){
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
  
  sessionDetailsinit(){
    let courseStartDateText = this.instructorCourseForm.value.courseStartDateText;
    let courseStartTimeText = this.instructorCourseForm.value.courseStartTimeText;
    let courseEndTimeText = this.instructorCourseForm.value.courseEndTimeText;
    this.courseSessionNumber = this.instructorCourseForm.value.courseSessionNumber;
    let courseDurationNumber = this.instructorCourseForm.value.courseDurationNumber;
    
    courseStartTimeText = moment(courseStartTimeText+':00', 'hh:mm:ss a');
    courseStartTimeText = moment(courseStartTimeText).format('LT');

    courseEndTimeText = moment(courseStartTimeText, 'LT').add(courseDurationNumber, 'hours');
    
    courseEndTimeText = moment(courseEndTimeText).format('LT');
    
    courseStartDateText = moment(courseStartDateText).format('DD-MM-YYYY');

    this.sessionArray.push(courseStartDateText, courseStartTimeText, courseEndTimeText);
    for(var i = 0; i < this.courseSessionNumber; i++){
    
      courseStartDateText = moment(courseStartDateText, 'DD-MM-YYYY').add(7, 'days').calendar();
      courseStartDateText = moment(courseStartDateText).format('DD-MM-YYYY');
      this.sessionArray.push(courseStartDateText, courseStartTimeText, courseEndTimeText);
      
    }
    console.log(this.sessionArray);
  }  
   
    
  }



