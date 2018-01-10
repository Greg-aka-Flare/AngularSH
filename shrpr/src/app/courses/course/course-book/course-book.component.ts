import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Pipe, PipeTransform} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ValidationService } from '../../../core/validation.service';
import { ControlMessagesComponent } from '../../../shared/control-messages/control-messages.component';
import { UserInterface } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../../../courses/course.service';

@Component({
  selector: 'course-book',
  templateUrl: './course-book.component.html',
  styleUrls: ['./course-book.component.css']
})
export class CourseBookComponent implements OnInit {

  @Input('course') course: any;
  @Output() onBooked: EventEmitter<boolean> = new EventEmitter;

  bookForm: any;
  data: any = {};
  loggedIn: boolean = false;
  createUser: boolean = false;

  constructor( 
    private auth: AuthService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit() {

    this.bookForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'coursename':[''],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'phone': ['', [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'contactselect': ['phone', Validators.required],
      'drivinguber': ['', Validators.required],
      'drivingrating': ['', Validators.required],
      'create': ['']
    });
    
    //check if logged in
    this.loggedIn = this.auth.loggedIn();
    
    if(this.loggedIn) this.auth.me().subscribe(result => {

        let name = result.name ? result.name : '';
        let email = result.email ? result.email : ''; //to pass async check
        let phone = result.phone ? result.phone : '';

        //patch values for form
        this.bookForm.patchValue({
          'name': name,
          'email': email,
          'phone': phone
        });
      }
    );
  }

  submit(){

    //set course id
    this.data.course_id = this.course.id;

    //not logged in
    if(!this.loggedIn){

      //get data to create user
      this.data.name = this.bookForm.value.name;
      this.data.email = this.bookForm.value.email;
      this.data.phone = this.bookForm.value.phone;

      //set local storage info
      localStorage.setItem('name', this.data.name);
      localStorage.setItem('email', this.data.email);
    }

    //get misc data
    this.data.phone = this.bookForm.value.phone;
    this.data.contactselect = this.bookForm.value.contactselect;
    this.data.drivinguber = this.bookForm.value.drivinguber;
    this.data.drivingrating = this.bookForm.value.drivingrating;

    //check to see if wants to create user
    this.createUser = this.bookForm.value.create;

    //book course
    this.user.book(this.data).subscribe(
      success => { 

        //logged in, or don't want to create user, close, emite data
        if(this.loggedIn || !this.createUser) {

          this.onBooked.emit(true);
        }
        else { //forward to sign-up
          this.router.navigateByUrl('login');
        }
      }
    )
  }

  close() {
    this.onBooked.emit(false);
  }
}