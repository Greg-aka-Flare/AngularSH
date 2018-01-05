import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { Router } from "@angular/router";
import { UserInterface } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { LikeService } from '../../../core/like.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['../login.component.css']
})
export class SignUpFormComponent implements OnInit {

	private emailTimeout;
  name: string = '';
  email: string = '';
  data: any = {};
  signupForm: FormGroup;
  ProfileForm: FormGroup;
  signup: boolean = false;
  signupError: boolean = false;
  signupErrorText: string;

  constructor(
  	private fb: FormBuilder,
    private user: UserService,
    private http: HttpClient,
    private auth: AuthService,
    private likeService: LikeService,
    private router: Router
  ) {}

  ngOnInit() {

    //get local storage data
    if(localStorage.getItem('name')) this.name = localStorage.getItem('name');
    if(localStorage.getItem('email')) this.email = localStorage.getItem('email');

    //create signup form
    this.signupForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email], this.validateEmailNotTaken.bind(this)],
      'password': ['', [Validators.required, Validators.minLength(6)]],
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

    if(this.data.name && this.data.email && this.data.password){
      this.signup = true;
    } 
    else {
      this.signup = false;
    }
  }

  onProfile(){

    //assign user role
    this.data.role = this.ProfileForm.value.role;

    //if user has role
    if(this.data.role){

      //create user
      this.user.signup(this.data).subscribe(
        success => this.onUserCreated(),
        error =>  console.log(error)
      );
    }
  }

  onUserCreated(){

    //log user in
    this.auth.login(this.data.email, this.data.password).subscribe(
      response => {

        //get all liked/disliked
        let likes = this.likeService.likes;
        let dislikes = this.likeService.dislikes;

        //create requests array
        let requests = [];

        //for every like, create new request
        for(let like of likes){

          let url = 'https://api.shrpr.co/api/course/' + like + '/like';

          requests.push(this.http.post(url, {}));
        }

        //for every dislike, create new request
        for(let dislike of dislikes){

          let url = 'https://api.shrpr.co/api/course/' + dislike + '/dislike';

          requests.push(this.http.post(url, {}));
        }

        //send all requests
        forkJoin(requests).subscribe(results => { console.log('Courses Liked/Disliked.') });

        //send to appropiate profile
        this.auth.me().subscribe(
          res => {

            //store data
            let id = res.id;
            let role = res.roles[0];

            //navigate to profile based on role
            if(role == 'student'){
              this.router.navigateByUrl('student/' + id);
            }
            else if(role == 'instructor'){
              this.router.navigateByUrl('instructor/' + id);
            }
            else if(role == 'institution'){
              this.router.navigateByUrl('institution/' + id);
            }
            else{
              this.router.navigateByUrl('/');
            }
          }
        );
      },
      error => console.log('Unable to login.')
    );
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