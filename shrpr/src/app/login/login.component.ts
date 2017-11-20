import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserInterface } from "../user.interface";
import { UserService } from "../user.service";
import { TabsComponent } from "../home/tabs/tabs.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  loginForm: FormGroup;

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
  }

  onSignup() {

    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.userService.signup(name, email, password)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
       );
  }

  onLogin() {

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.userService.login(email, password)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
       );
  }
}