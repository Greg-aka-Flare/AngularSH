import { Component, OnInit, ViewChild, ElementRef, Renderer, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  
  courseForm: FormGroup;
  semesterInfoForm: FormGroup;
  semesterDetailForm: FormGroup;
  course: Course;

  courseSemesterNumber:number = 1;
  @ViewChild('panel') panel : ElementRef;
  
  slideNo: number = 1;
  lastSlideNo:number = 3;
  prevPos: string = '';
  nextPos:number = 0;
  gotothree:boolean = false;
  addSemConfirm:boolean = false;
  addCourseConfirm:boolean = false;
  
  confirmSemData:boolean;
  showSubmit:boolean = false;
  showSessionList:boolean = false;

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

    this.semesterInfoForm = this.fb.group({  
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

    this.semesterDetailForm = this.fb.group({});
  }

  nextSlide(){
    if(this.slideNo == 1){
      this.submitCourse();
    }
    if(this.slideNo == 2){
      this.sessionDetailsinit();
    }
    if(this.slideNo == 3){
      this.submitAllFormData();
    }
   
    if( this.slideNo > 0 && this.slideNo < this.lastSlideNo ){
      this.slideNo++;
      this.renderer.setElementStyle(
      this.panel.nativeElement, 
      'transform', 
      'translateX(-' + String((this.slideNo - 1) * 100) + '%)');
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

  submitCourse() {

    //create course
    this.course = {
      group_id: this.courseForm.value.courseGroupSelect,
      instructor_id: this.user.id,
      title: this.courseForm.value.courseTitleText,
      description: this.courseForm.value.courseDescriptionText,
      addresses: [],
      semesters: [],
      categories: [
        this.courseForm.value.courseCategorySelect,
        this.courseForm.value.courseSubCategorySelect
      ]
    }
  } 
  
  sessionDetailsinit(){
    
    let type = this.semesterInfoForm.value.type;
    let total = this.semesterInfoForm.value.total;
    let duration = this.semesterInfoForm.value.duration;
    let meetings = [];
    let startDate;
    let endDate;

    //create meetings
    for(let i = 0; i < total; i++) {

      //create start/end dates
      let start = moment(this.semesterInfoForm.value.startDate + ' ' + this.semesterInfoForm.value.startTime);
      let end = start.clone().add(duration, 'hours');

      //if not first iteration, modify dates
      if(i > 0) {
        start.add(i, type);
        end.add(i, type);
      }

      //create start/end date for semester
      if(i === 0) startDate = start.format('YYYY-MM-DD hh:mm:ss');
      if(i === total) endDate = end.format('YYYY-MM-DD hh:mm:ss');

      //add to meetings
      meetings.push({
        'start' : start.format('YYYY-MM-DD hh:mm:ss'),
        'end' : end.format('YYYY-MM-DD hh:mm:ss')
      });
    }

    //add address
    this.course.addresses.push({
      'streetAddress' : this.semesterInfoForm.value.streetAddress,
      'city' : this.semesterInfoForm.value.city,
      'state': this.semesterInfoForm.value.state, 
      'zip' : this.semesterInfoForm.value.zip
    });

    this.course.semesters.push({
      'amount': this.semesterInfoForm.value.amount, 
      'start_date': startDate, 
      'end_date': '', 
      'meetings': meetings,
      'primary_img': this.semesterInfoForm.value.primaryImg,
      'details' : {
         'secondary_img' : this.semesterInfoForm.value.secondaryImg
      }
    });

    this.gotothree = true;
  } 

  //slide view during signup process add semester confirmation popup open
  closeAddSemConfirm(){
    this.addSemConfirm = false;  
  }
  
  //slide view last slide submit button click to open course added confirm box 
  submitAllFormData(){
    console.log(this.course);
    this.addCourseConfirm = true;
  }

  //slide view during signup process course added confiramtion popup close and navigate to profile page
  closeCourseConfirm() {
    this.addCourseConfirm = false;
    localStorage.removeItem('signupUser');
    this.router.navigate(['profile']);
  }

  //page view semester details show from profile page
  showSessionDetail(){
    this.submitCourse();
    this.sessionDetailsinit();
    this.showSessionList = true;
  }

  //page view semester add confirmation show from profile page
  confirmSemesterData(){
    //click of confirm add semester data to form object
    this.confirmSemData = true;
    
  }

  //page view semester add confirmation close from profile page
  closeConfirmSemData(){
    this.confirmSemData = false;
    this.showSubmit = true;
  }

  //page view to add new semester and confirmation close from profile page
  addNewSemesterInit(){
    this.confirmSemData = false;

    //show the semester no. to be add in page view
    this.courseSemesterNumber++;

    //blank the semesterInfoForm to add new semester information to this form
    //this.initSemesterForm();
    //this.sessionArray = [];
    this.showSessionList = false;
  }

  //page view submit all semester data to form object
  submitSemesterData(){
    this.addCourseConfirm = true;
    console.log(this.course);
  }
}