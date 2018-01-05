import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { UserInterface } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login-form.component.html',
  styleUrls: ['../login.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  signinError: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    public userService: UserService,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onLogin() {

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.subscriptions.add(this.auth.login(email, password)
      .subscribe(
        success => {
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
        error => {
          this.signinError = true;
        }
      ));
  }
}