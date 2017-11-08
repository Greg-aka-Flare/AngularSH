import { Component, OnInit } from '@angular/core';

import { UserInterface } from "../user.interface";
import { UserService } from "../user.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public userService: UserService){ 

  }

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  onLogin(){
  }

}