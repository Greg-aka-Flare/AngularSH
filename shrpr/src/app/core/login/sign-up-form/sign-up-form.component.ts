import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { UserInterface } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['../login.component.css']
})
export class SignUpFormComponent implements OnInit {

	private emailTimeout;
  signupForm: FormGroup;
  ProfileForm: FormGroup;
  signup: boolean = false;
  signupError: boolean = false;
  signupErrorText: string;

  private subscriptions = new Subscription();

  constructor(
  	private fb: FormBuilder,
    private user: UserService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      'name': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email], this.validateEmailNotTaken.bind(this)],
      'password': [null, Validators.required]
    });

    this.ProfileForm = this.fb.group({
      'signuptype': [null, [Validators.required]]
    });
  }

  onSignup() {

    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.subscriptions.add(this.user.signup(name, email, password)
      .subscribe(
        response => { console.log(response) },
        error => { console.log(error) }
    ));
  }

  onProfile(){
    const profile = this.ProfileForm.value.signuptype;
    if(profile == 'student'){
      this.router.navigateByUrl('profile/course-select');
    }
    if(profile == 'instructor'){
      this.router.navigateByUrl('profile/instructor-course');
    }
    if(profile == 'institution'){
      this.router.navigateByUrl('institution/112');
    }
  }

  validateEmailNotTaken(control: FormControl): Promise<any> | Observable<any> {

    clearTimeout(this.emailTimeout);

  	const promise = new Promise<any>((resolve, reject) => {

      this.emailTimeout = setTimeout(() => {
	  		this.user.checkEmail(control.value).subscribe(
	  			success => { 
            console.log(success);
            resolve(null); },
	  			error => { 
            console.log(error);
            resolve({ 'emailTaken': true }) })
	  	}, 600);
  	});

  	return promise;
  }
}