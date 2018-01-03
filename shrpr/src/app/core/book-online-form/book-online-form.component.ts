import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';
import { UserInterface } from '../../core/user.interface';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

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
  bookonlineForm: any;
  data: any = {};

  constructor( 
    private auth: AuthService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
  ) {}

  ngOnInit() {

    
    this.route.params.subscribe((params: Params) => {
      this.courseId = params['id'];
    });
    
    this.bookonlineForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator], [this.validateEmailNotTaken.bind(this)]],
      'phone': ['', [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'contactselect': ['phone', Validators.required],
      'drivinguber': ['', Validators.required],
      'drivingrating': ['', Validators.required],
      'create': ['']
    });

    this.auth.me().subscribe(
      success => {
        this.loggedIn = true;

        let name = success.name ? success.name : '';
        let email = success.email ? 'user@fakeemail.com' : ''; //to pass async check
        let phone = success.phone ? success.phone : '';

        //patch values for form
        this.bookonlineForm.patchValue({
          'name': name,
          'email': email,
          'phone': phone
        });
      },
      error => {
        this.loggedIn = false;
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

        //logged in, navigate home
        if(this.loggedIn || this.data.create) {

          //back to course
          this.router.navigateByUrl('/courses/' + this.courseId); 
        }
        else{ //not logged in, go to signup/login screen
          this.router.navigateByUrl('login');
        }
      }
    )
  }

  validateEmailNotTaken(control: FormControl): Promise<any> | Observable<any> {

    clearTimeout(this.emailTimeout);

    const promise = new Promise<any>((resolve, reject) => {

      this.emailTimeout = setTimeout(() => {
        this.user.checkEmail(control.value).subscribe(
          success => resolve(null),
          error => resolve({ 'emailTaken': true }))
      }, 600);
    });

    return promise;
  }
}