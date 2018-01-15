import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { Router } from "@angular/router";
import { User } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { AuthService } from '../../../auth/auth.service';
import { CuriousService } from '../../../core/curious.service';
import { ValidationService } from '../../../core/validation.service';
import { environment } from '../../../../environments/environment';
import {} from '@types/googlemaps';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['../login.component.css']
})
export class SignUpFormComponent implements OnInit {

  api: string = environment.api;
  name: string = '';
  email: string = '';
  data: any = {};
  signupForm: FormGroup;
  ProfileForm: FormGroup;
  signup: boolean = false;
  signupError: boolean = false;
  signupErrorText: string;
  currentLocation: boolean = true;
  emailTimeout;

  constructor(
  	private fb: FormBuilder,
    private user: UserService,
    private http: HttpClient,
    private auth: AuthService,
    private curious: CuriousService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {

    //get local storage data
    if(localStorage.getItem('name')) this.name = localStorage.getItem('name');
    if(localStorage.getItem('email')) this.email = localStorage.getItem('email');

    //create signup form
    this.signupForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator ], this.validateEmailNotTaken.bind(this)],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      'location': true
    });

    //create profile form
    this.ProfileForm = this.fb.group({
      'role': ['', [Validators.required]]
    });
  }

  onSignup() {

    //assign user data
    this.data.name = this.signupForm.value.name;
    this.data.email = this.signupForm.value.email;
    this.data.password = this.signupForm.value.password;

    this.signup = true;
  }

  onSocialSignin(data) {

    this.data = data;

    this.signup = true;

    this.zone.run(() => {});
  }

  onProfile(){

    //assign user role
    this.data.role = this.ProfileForm.value.role;

    //if user has role
    if(this.data.role){

      switch(this.data.type) {
        case 'google':
          this.auth.google(this.data).subscribe( 
            success => this.onUserCreated(),
            error => { 
              console.log(error);
              this.signupError = true;
              this.signupErrorText = 'Unable to sign-in due to account settings';
            }
          );
          break;

        case 'facebook':
          this.auth.facebook(this.data).subscribe( 
            success => this.onUserCreated(),
            error => { 
              console.log(error);
              this.signupError = true;
              this.signupErrorText = 'Unable to sign-in due to account settings';
            } 
          );
          break;

        case 'linkedin':
          this.auth.linkedin(this.data).subscribe( 
            success => this.onUserCreated(),
            error => { 
              console.log(error);
              this.signupError = true;
              this.signupErrorText = 'Unable to sign-in due to account settings';
            } 
          );
          break;
        
        default:
          this.auth.signup(this.data).subscribe( 
            success => this.onUserCreated(),
            error => { 
              console.log(error);
              this.signupError = true;
              this.signupErrorText = 'Unable to sign-up';
            } 
          );
          break;
      }
    }
  }

  onUserCreated() {

    //save all likes/dislikes in localStorage, go to profile upon success/failure
    this.curious.clear().subscribe(
      success => {

        console.log(success);

        this.router.navigate(['profile']);
      },
      error => {

        console.log(error);

        this.router.navigate(['profile']);
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