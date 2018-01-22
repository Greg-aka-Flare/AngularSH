import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Pipe, PipeTransform} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ValidationService } from '../../../core/validation.service';
import { ControlMessagesComponent } from '../../../shared/control-messages/control-messages.component';
import { User } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../../../courses/course.service';

@Component({
  selector: 'enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  @Input('course') course: any;
  @Output() onBooked: EventEmitter<boolean> = new EventEmitter;

  bookForm: any;
  data: any = {};
  loggedIn: boolean = false;
  createUser: boolean = false;
  img: string = '';

  constructor( 
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    
    //check if logged in
    this.loggedIn = this.auth.loggedIn();

    //get image
    this.img = this.course.semesters[0].primary_img;
  }

  close() {
    this.onBooked.emit(false);
  }
}