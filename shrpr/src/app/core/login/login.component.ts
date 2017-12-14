import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { UserInterface } from '../../core/user.interface';
import { UserService } from '../../core/user.service';
import { TabsComponent } from '../../shared/tabs/tabs.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {GoogleSignInSuccess} from 'angular-google-signin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  loginForm: FormGroup;
  private subscriptions = new Subscription();
  isSignedIn:boolean = false;
  id: String;
  name: String;
  imageUrl:String;
  email: String;
  
  private myClientId: string = '256107299050-j9qgiutqv2i1vuj2t9lrrt1bvu98fh35.apps.googleusercontent.com';
  
    onGoogleSignInSuccess(event: GoogleSignInSuccess) {
      let googleUser: gapi.auth2.GoogleUser = event.googleUser;
      let id: string = googleUser.getId();
      let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
      console.log('ID: ' +
        profile
          .getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      this.id = profile.getId();
      this.name = profile.getName();
      this.imageUrl = profile.getImageUrl();
      this.email = profile.getEmail();
      this.isSignedIn = googleUser.isSignedIn();
    }
    signOut() {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut();
      this.isSignedIn = false;
    }
  constructor(
    public userService: UserService,
    private http: HttpClient,
    private auth: AuthService
   ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });

    console.log(this.auth.loggedIn());
    
  }

  onSignup() {

    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.subscriptions.add(this.userService.signup(name, email, password)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
       ));
  }

  onLogin() {

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.subscriptions.add(this.auth.login(email, password)
      .subscribe(
        response => {

          localStorage.setItem('access_token', response.access_token);
        },
        error => console.log(error)
      ));
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}