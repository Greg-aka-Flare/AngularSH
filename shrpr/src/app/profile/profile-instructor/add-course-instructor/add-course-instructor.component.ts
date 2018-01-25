import { Component, OnInit, ViewChild, ElementRef, NgModule, Renderer, NgZone, Input, EventEmitter, AfterViewInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { Router } from "@angular/router";
import { ValidationService } from '../../../core/validation.service';
import { Instructor } from '../../../instructors/instructor.interface';

@Component({
  selector: 'add-course-instructor',
  templateUrl: './add-course-instructor.component.html',
  styleUrls: ['./add-course-instructor.component.css']
})

export class AddCourseInstructorComponent implements OnInit {

  @Input('instructor') instructor: Instructor;
  
  instructorCourseForm: FormGroup;
  semesterInfoForm: FormGroup;
  
  semesterDetailForm: FormGroup;
  sessionArray: any[] = [];
  meetingArray: any[] = [];
  detailsData: any[] = [];
  semesterData: Array<{amount: number, duration: number, start_date: string, end_date: string, addresses: any, meetings: any, primary_img: string, details : any }> = [];
  meetingData: Array<{substitute: string, start: string, end: string }> = [];
  addressArray: Array<{address: string, city: string, state: string, zip: string }> = [];
  data: any = {};
  semesterInfo: any = {};
  
  courseImages:any = {};
  courseSemesterNumber:number = 1;
  @ViewChild("search") public searchElementRef: ElementRef;
  @ViewChild('panel') panel : ElementRef;
  @ViewChild('myForm') myForm: ElementRef;
  
  
  location: string = '';
  
  slideNo: number = 1;
  lastSlideNo:number = 3;
  prevPos: string = '';
  nextPos:number = 0;
  goNext:boolean = false;
  gotothree:boolean = false;
  addSemConfirm:boolean = false;
  addCourseConfirm:boolean = false;
  
  courseStartTimeText:string;
  courseEndTimeText:string;
  courseSessionNumber:number;
  courseDurationNumber:number;
  courseFeeText:number;
  dt:Date;

  streetAddressInput: string;
  cityInput: string;
  stateInput: string;
  zipInput: string;
  
  signupType: string;
  firstLogin:boolean;
  confirmSemData:boolean;
  showSubmit:boolean = false;
  showSessionList:boolean = false;
  constructor(
    public renderer: Renderer,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    if( localStorage.getItem('signupUser') == 'new'){
      this.firstLogin = true;
    }
    else{
      this.firstLogin = false;
    } 
    console.log('first login is: ' + this.firstLogin);
    this.instructorCourseForm = this.fb.group({
      'courseTitleText': ['', Validators.required],
      'courseGroupSelect': ['', Validators.required],
      'courseCategorySelect': ['', Validators.required],
      'courseSubCategorySelect': ['', Validators.required],
      'courseDescriptionText': ['', [Validators.required, Validators.minLength(40)]]
    }); 
    this.initSemesterForm(); 
    
    //console.log(this.instructors.id)
    this.goNext = this.instructorCourseForm.valid;
    this.semesterDetailForm = new FormGroup({  
      
    });
    
    this.semesterDetailForm = new FormGroup({  
      
    });

  }
  
  
initSemesterForm(){
  this.semesterInfoForm = this.fb.group({  
    'courseStartDateText': ['', Validators.required],
    'courseIteration' : ['', Validators.required],
    'courseStartTimeText': ['', Validators.required],
    'courseEndTimeText': [''],
    'courseSessionNumber': ['', Validators.required],
    'courseDurationNumber': ['', Validators.required],
    'courseFeeText': ['', Validators.required],
    'coursePrimaryPhoto': [''],
    'courseSecondaryPhoto' : [''], 
    'streetAddressText': ['', Validators.required],
    'cityText': ['', Validators.required],
    'stateText': ['', Validators.required],
    'zipText': ['', Validators.required]
  });
}


  nextSlide(){
    if(this.slideNo == 1){
      this.instructorCourseSubmit();
    }
    if(this.slideNo == 2){
      this.sessionDetailsinit();
      //this.addSemester();
    }
    if(this.slideNo == 3){
      this.submitAllFormData();
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

      let groupText: Array<{id: number, label: string}> = [];
      let categoryText: Array<{id: number, name: string, parent: number}> = [];
      let instructorText: Array<{id: number, name: string, email: string}> = [];

      this.instructor.id
      
      this.data.title = this.instructorCourseForm.value.courseTitleText;

      instructorText.push({
        "id" : this.instructor.id,
        "name" : this.instructor.name,
        "email" : this.instructor.email
      });

      this.data.instructor = instructorText;
      
      let grouptid = this.instructorCourseForm.value.courseGroupSelect;
      let parentId =  this.instructorCourseForm.value.courseCategorySelect;

      categoryText.push(
        {
          "id" : this.instructorCourseForm.value.courseSubCategorySelect,
          "name" : '',
          "parent" : parentId 
        }
      );
      this.data.categories = categoryText;

      groupText.push(
        {
          "id" : grouptid,
          "label" : ''
        }
      );

      this.data.group = groupText;

      this.data.description = this.instructorCourseForm.value.courseDescriptionText;
      //console.log(this.data);
        
    } 
  
  
  sessionDetailsinit(){
    //if first login is true empty the semester array to hold single
    //semester data other wise donot empty it, let it hold other semester as well
    if(this.firstLogin){
      this.semesterData = [];
    }
    
    this.meetingArray = [];
    this.addressArray = [];
    
    let courseStartTimeText:any = '';
    let courseEndTimeText:any = '';

    this.streetAddressInput = '';
    this.cityInput = '';
    this.stateInput = '';
    this.zipInput = '';
    
    let courseStartDateText = this.semesterInfoForm.value.courseStartDateText;
    let courseIteration = this.semesterInfoForm.value.courseIteration;
    
    courseStartTimeText = this.semesterInfoForm.value.courseStartTimeText;
    courseEndTimeText = this.semesterInfoForm.value.courseEndTimeText;

    this.courseSessionNumber = this.semesterInfoForm.value.courseSessionNumber;
    let courseDurationNumber = this.semesterInfoForm.value.courseDurationNumber;
    let searchControl = this.semesterInfoForm.value.searchControl;
    let primaryPhoto = this.semesterInfoForm.value.coursePrimaryPhoto;
    let secondaryPhoto = this.semesterInfoForm.value.courseSecondaryPhoto;
    this.courseFeeText = this.semesterInfoForm.value.courseFeeText;

    courseStartTimeText = moment(courseStartTimeText+':00', 'hh:mm:ss a');
    courseStartTimeText = moment(courseStartTimeText).format('HH:MM');
    courseEndTimeText = moment(courseStartTimeText, 'LT').add(courseDurationNumber, 'hours');
    courseEndTimeText = moment(courseEndTimeText).format('HH:MM');
    courseStartDateText = moment(courseStartDateText).format('YYYY-MM-DD');
    //empty the session array for a new semester
    if(this.sessionArray.length > 0) {
      for(var k =0, l = this.sessionArray.length; k < l; k++){
        this.sessionArray.pop(); 
      } 
    }
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
    let startdate = this.semesterInfoForm.value.courseStartDateText + ' ' + this.semesterInfoForm.value.courseStartTimeText;
    let enddate = this.sessionArray[this.sessionArray.length-1].sessionDate + ' ' + this.sessionArray[this.sessionArray.length-1].endTime;
    
    for(var p = 0, q = this.sessionArray.length; p < q; p++){
      
      let startdt = this.sessionArray[p].sessionDate+' '+this.sessionArray[p].startTime;
      let enddt = this.sessionArray[p].sessionDate+' '+this.sessionArray[p].endTime;
      
      this.meetingArray.push(
        {
          "substitute" : null,
          "start" : startdt,
          "end" : enddt
        }
      );
    }
    if(this.detailsData.length > 0){
      for(var k =0, l = this.detailsData.length; k < l; k++){
        this.detailsData.pop(); 
      }  
    }
    this.detailsData.push(
      {
         "secondary_img" : secondaryPhoto
      }
    );

    this.streetAddressInput = this.semesterInfoForm.value.streetAddressText;
    this.cityInput = this.semesterInfoForm.value.cityText;
    this.stateInput = this.semesterInfoForm.value.stateText;
    this.zipInput = this.semesterInfoForm.value.zipText;
   
    if(this.addressArray.length > 0) {
      for(var k =0, l = this.addressArray.length; k < l; k++){
        this.addressArray.pop(); 
      } 
    }

    this.addressArray.push(
      {
        "address" : this.streetAddressInput,
        "city" : this.cityInput,
        "state": this.stateInput, 
        "zip" : this.zipInput, 
      }
    );
   
    this.semesterData.push(
      {
        "amount" : this.semesterInfoForm.value.courseFeeText, 
        "duration" : this.courseSessionNumber, 
        "start_date": startdate, 
        "end_date": enddate, 
        "addresses": this.addressArray, 
        "meetings": this.meetingArray,
        "primary_img" : primaryPhoto,
        "details" : this.detailsData
      }
    );
    this.gotothree = true;
    //if this is first login is true add single semester data to form object
    if(this.firstLogin){
    this.data.semesters = this.semesterData;
    }
    //console.log(this.data);
    //this.addSemConfirm = true;
    //this.initSemesterForm();    
    //this.courseSemesterNumber++;
  } 
  //slide view during signup process add semester confirmation popup open
  closeAddSemConfirm(){
    this.addSemConfirm = false;  
  }
  
  //slide view last slide submit button click to open course added confirm box 
  submitAllFormData(){
     console.log(this.data);
     this.addCourseConfirm = true;
     
   }
   //slide view during signup process course added confiramtion popup close and navigate to profile page
  closeCourseConfirm() {
    this.addCourseConfirm = false;
    this.router.navigate(['profile']);
  }


  //page view semester details show from profile page
  showSessionDetail(){
    this.instructorCourseSubmit();
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
    //this.router.navigate(['profile']);
    //localStorage.removeItem('signupUser');
  }
  //page view to add new semester and confirmation close from profile page
  addNewSemesterInit(){
    this.confirmSemData = false;
    //show the semester no. to be add in page view
    this.courseSemesterNumber++;
    //blank the semesterInfoForm to add new semester information to this form
    this.initSemesterForm();
    this.sessionArray = [];
    this.showSessionList = false;
    /*if(this.sessionArray.length > 0) {
      for(var k =0, l = this.sessionArray.length; k < l; k++){
        this.sessionArray.pop(); 
      } 
    } */
  }
  //page view submit all semester data to form object
  submitSemesterData(){
    this.data.semesters = this.semesterData;
    this.addCourseConfirm = true;
    console.log(this.data);
 }


  
}
