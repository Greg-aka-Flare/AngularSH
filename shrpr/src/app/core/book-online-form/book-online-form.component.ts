import {  Component, OnInit, OnDestroy, Input, Pipe, PipeTransform} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';
import { UserInterface } from '../../core/user.interface';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { CourseService } from "../../courses/course.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-book-online-form',
  templateUrl: './book-online-form.component.html',
  styleUrls: ['./book-online-form.component.css']
})
export class BookOnlineFormComponent implements OnInit {

  private emailTimeout;
  courseId;
  loggedIn: boolean = false;
  menu: boolean = true;
  search: boolean = true;
  onSucces:boolean = true;
  private subscriptions = new Subscription();
  bookonlineForm: any;
  data: any = {};
  course: any;
  coursename:string;

  constructor( 
    private auth: AuthService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    
    this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.courseId = params['id'];

      this.courseService.getCourse(this.courseId).subscribe(course => {
        this.course = course;
        this.coursename = this.course.title;
      })

    }));

    this.bookonlineForm = this.fb.group({
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
        let email = result.email ? 'user@fakeemail.com' : ''; //to pass async check
        let phone = result.phone ? result.phone : '';

        //patch values for form
        this.bookonlineForm.patchValue({
          'name': name,
          'email': email,
          'phone': phone
        });
      }
    );
  }

  updateBookonline(){

    //set course id
    this.data.course_id = this.courseId;

    //not logged in
    if(!this.loggedIn){

      //get data to create user
      this.data.name = this.bookonlineForm.value.name;
      this.data.email = this.bookonlineForm.value.email;
      this.data.phone = this.bookonlineForm.value.phone;
      this.data.create = this.bookonlineForm.value.create;
      this.data.coursename = this.coursename;

      //set local storage info
      localStorage.setItem('name', this.data.name);
      localStorage.setItem('email', this.data.email);
    }

    //get misc data
    this.data.phone = this.bookonlineForm.value.phone;
    this.data.contactselect = this.bookonlineForm.value.contactselect;
    this.data.drivinguber = this.bookonlineForm.value.drivinguber;
    this.data.drivingrating = this.bookonlineForm.value.drivingrating;
    this.data.create = this.bookonlineForm.value.create;

    //book course
    this.user.book(this.data).subscribe(
      success => { 
         this.onSucces = false;
        //logged in, navigate home
        if(this.loggedIn || !this.data.create) {
          setTimeout(()  => {
              this.router.navigateByUrl('/courses/' + this.courseId); 
            }, 2000);
          //back to course
        }
        else { //not logged in, go to signup/login screen
          this.router.navigateByUrl('login');
        }
      }
    )
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}