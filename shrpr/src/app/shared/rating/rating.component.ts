import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ValidatorFn } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';
import { AuthService } from './../../auth/auth.service';
import { User } from '../../core/user.interface';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {

  @Input('rating') rating: any;
  @Input('ratings') ratings: any;
  data: any = {};
  ratingForm: FormGroup;
  loggedIn: boolean = false;
  user: User;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.ratingForm = this.fb.group({
      'title': ['', [Validators.required]],
      'rating': ['', Validators.required],
      'comment': ['', [Validators.required, Validators.minLength(40)]],
    });

    this.loggedIn = this.auth.loggedIn();

    if(this.loggedIn) {
      this.auth.me().subscribe(
        user => {
          this.user = user;

          console.log(this.user);
        }
      );
    }
  }

  goTo(location: string): void {
    window.location.hash = location;
  }
   
  submit(){
    //get data to create user
    this.data.title = this.ratingForm.value.title;
    this.data.rating = this.ratingForm.value.rating;
    this.data.comment = this.ratingForm.value.comment;
 
    console.log(
      'Headline for Your Review:' + this.data.title,
      'Rating :' + this.data.rating,
      'Comment :' + this.data.comment,
   )
  }
}
