import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { UserInterface } from '../../core/user.interface';
import { UserService } from '../../core/user.service';
import { TabsComponent } from '../../shared/tabs/tabs.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {GoogleSigninComponent} from './google/google.component';
import {FacebookLoginComponent} from './facebook/facebook.component';
import {LinkedinComponent} from './linkedin/linkedin.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  loginForm: FormGroup;
  private subscriptions = new Subscription();
  signup:boolean = false;
  signupError:boolean = false;
  signupErrorText:string;
  
  constructor(
    public userService: UserService,
    private http: HttpClient,
    private auth: AuthService
   ) {
   }

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
        response => {
            //console.log(response)
            if(response.status === 201){
              this.signup = !this.signup; 
            }
          },
        error => {
          //console.log(error)
          if(error.status === 422){
            this.signupError = true;
            //this.signupErrorText = JSON.parse(error._body).message;
          }
        },
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