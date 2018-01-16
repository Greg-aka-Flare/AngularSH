import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { User } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { AuthService } from '../../../auth/auth.service';
import { CuriousService } from '../../../core/curious.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login-form.component.html',
  styleUrls: ['../login.component.css']
})
export class LoginFormComponent implements OnInit {

  api: string = environment.api;
  loginForm: FormGroup;
  loginType: string = '';
  loggedIn: boolean = false;
  loginError: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    public userService: UserService,
    private http: HttpClient,
    private auth: AuthService,
    private curious: CuriousService,
    private router: Router
  ) {}

  ngOnInit() {

    //check if logged in
    this.loggedIn = this.auth.loggedIn();
    
    //go to profile if logged in already
    if(this.loggedIn) this.router.navigate(['profile']);

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onLogin() {

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.login(email, password).subscribe( 
      success => this.onLoggedIn(),
      error => this.loginError = true  
    );
  }

  onSocialSignin(data) {

    switch(data.type) {
      case 'google':
        this.auth.google(data).subscribe( 
          success => this.onLoggedIn(),
          error => this.loginError = true
        );
        break;

      case 'facebook':
        this.auth.facebook(data).subscribe( 
          success => this.onLoggedIn(),
          error => this.loginError = true
        );
        break;

      case 'linkedin':
        this.auth.linkedin(data).subscribe( 
          success => this.onLoggedIn(),
          error => this.loginError = true 
        );
        break;
    }
  }

  onLoggedIn() {

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
}