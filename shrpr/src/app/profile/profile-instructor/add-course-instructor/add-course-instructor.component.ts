import { Component, OnInit, ViewChild, ElementRef, Renderer, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import * as moment from 'moment';

import { ValidationService } from '../../../core/validation.service';
import { Course } from '../../../courses/course.interface';
import { User } from '../../../core/user.interface';


@Component({
  selector: 'add-course-instructor',
  templateUrl: './add-course-instructor.component.html',
  styleUrls: ['./add-course-instructor.component.css']
})
export class AddCourseInstructorComponent implements OnInit {

  @Input('user') user: User;
  @ViewChild('panel') panel: ElementRef;
  
  courseForm: FormGroup;
  semesterForm: FormGroup;
  meetingForm: FormGroup;
  course: Course;
  slide: number = 1;
  lastSlide: number = 3;

  constructor(
    private renderer: Renderer,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.courseForm = this.fb.group({
      'title': ['', Validators.required],
      'group': ['', Validators.required],
      'category': ['', Validators.required],
      'subCategory': ['', Validators.required],
      'courseDescriptionText': ['', [Validators.required, Validators.minLength(40)]]
    }); 

    this.semesterForm = this.fb.group({  
      'type' : ['', Validators.required],
      'startDate': ['', Validators.required],
      'startTime': ['', Validators.required],
      'total': ['', Validators.required],
      'duration': ['', Validators.required],
      'amount': ['', Validators.required],
      'primaryImg': [''],
      'secondaryImg' : [''], 
      'streetAddress': ['', Validators.required],
      'city': ['', Validators.required],
      'state': ['', Validators.required],
      'zip': ['', Validators.required]
    });

    this.meetingForm = this.fb.group({
      meetings: this.fb.array([])
    });
  }

  initMeeting() {
    return this.fb.group({
      'startDate': ['', Validators.required],
      'startTime': ['', Validators.required],
      'endTime': ['', Validators.required]
    });
  }

  addMeeting() {

    const control = <FormArray>this.meetingForm.controls['meetings'];

    control.push(this.initMeeting());
  }

  deleteMeeting(index: number) {

    const control = <FormArray>this.meetingForm.controls['meetings'];

    control.removeAt(index);
  }

  nextSlide() {

    if(this.slide == 1){
      this.submitCourse();
    }
    if(this.slide == 2){
      this.submitSemester();
    }
    if(this.slide == 3){
      this.submitMeetings();
    }
   
    if( this.slide > 0 && this.slide < this.lastSlide ){
      this.slide++;
      this.renderer.setElementStyle(
      this.panel.nativeElement, 
      'transform', 
      'translateX(-' + String((this.slide - 1) * 100) + '%)');
    }
  }

  prevSlide() {
    if( this.slide >= 2 ){
      this.slide--;
      this.renderer.setElementStyle(
      this.panel.nativeElement, 
      'transform', 
      'translateX(-' + String((this.slide-1) * 100) + '%)');
    }
    else{
      this.renderer.setElementStyle(
        this.panel.nativeElement, 
        'transform', 
        'translateX(0px)');
    }
  }

  submitCourse() {

    //create course
    this.course = {
      group_id: this.courseForm.value.group,
      instructor_id: this.user.id,
      title: this.courseForm.value.title,
      description: this.courseForm.value.description,
      addresses: [],
      semesters: [],
      categories: [
        this.courseForm.value.category,
        this.courseForm.value.subCategory
      ]
    }
  } 
  
  submitSemester() {

    const control = <FormArray>this.meetingForm.controls['meetings'];
    
    let type = this.semesterForm.value.type;
    let total = this.semesterForm.value.total;
    let duration = this.semesterForm.value.duration;
    let meetings = [];
    let startDate;
    let endDate;

    //create meetings
    for(let i = 0; i < total; i++) {

      //create start/end dates
      let start = moment(this.semesterForm.value.startDate + ' ' + this.semesterForm.value.startTime);
      let end = start.clone().add(duration, 'hours');

      //if not first iteration, modify dates
      if(i > 0) {
        start.add(i, type);
        end.add(i, type);
      }

      //create start/end date for semester
      if(i === 0) startDate = start.format('YYYY-MM-DD HH:mm:ss');
      if(i === total) endDate = end.format('YYYY-MM-DD HH:mm:ss');

      //add to meetings
      meetings.push({
        'start' : start.format('YYYY-MM-DD HH:mm:ss'),
        'end' : end.format('YYYY-MM-DD HH:mm:ss')
      });

      //add control
      control.push(this.fb.group({
        'startDate': [start.format('YYYY-MM-DD'), Validators.required],
        'startTime': [start.format('HH:mm'), Validators.required],
        'endTime': [end.format('HH:mm'), Validators.required]
      }));
    }

    //add address
    this.course.addresses.push({
      'streetAddress' : this.semesterForm.value.streetAddress,
      'city' : this.semesterForm.value.city,
      'state': this.semesterForm.value.state, 
      'zip' : this.semesterForm.value.zip
    });

    this.course.semesters.push({
      'amount': this.semesterForm.value.amount, 
      'start_date': startDate, 
      'end_date': endDate, 
      'meetings': meetings,
      'primary_img': this.semesterForm.value.primaryImg,
      'details' : {
        'secondary_img' : this.semesterForm.value.secondaryImg
      }
    });
  }

  submitMeetings() {
    
    let meetings = [];

    //update meetings array
    for(let meeting of this.meetingForm['controls']['meetings']['controls']) {

      //create start/end dates
      let start = moment(meeting['controls'].startDate.value + ' ' + meeting['controls'].startTime.value);
      let end = moment(meeting['controls'].startDate.value + ' ' + meeting['controls'].endTime.value);

      //add to meetings
      meetings.push({
        'start' : start.format('YYYY-MM-DD HH:mm:ss'),
        'end' : end.format('YYYY-MM-DD HH:mm:ss')
      });
    }

    //set meetings
    this.course.semesters[0].meetings = meetings;
  }
}