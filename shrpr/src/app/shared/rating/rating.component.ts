import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ValidatorFn } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';

import { AuthService } from '@app/auth';
import { Course, Instructor, Rating, RatingService, User, ValidationService } from '@app/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {

  @Input('item') item: Course | Instructor;
  @Input('total') total: number;
  @Input('type') type: string;

  rating: Rating;
  ratings: Rating[];
  ratingForm: FormGroup;
  saved: boolean = false;
  showForm: boolean = false;
  user: User;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private ratingService: RatingService
  ) { }

  ngOnInit() {

    //get ratings
    this.ratingService.all(this.item, this.type).subscribe(ratings => this.parseRatings(ratings));
  }

  parseRatings(ratings: Rating[]) {

    //create form
    this.ratingForm = this.fb.group({
      'id': [''],
      'title': ['', [Validators.required]],
      'rating': ['', Validators.required],
      'comment': ['', [Validators.required, Validators.minLength(40)]],
    });

    //check if user has reviewed
    if(this.auth.loggedIn()) {

      this.auth.me().subscribe(user => {

          //store user
          this.user = user;

          //check if user has student role, if not a student return
          if(this.user.roles.includes('student')) this.showForm = true; else return;

          //check if user has rating
          for(let i = 0; i < ratings.length; ++i) {

            //set if match found
            if(ratings[i].user.id == user.id) {

              //store user rating
              this.rating = ratings[i];

              //remove user rating from array
              ratings.splice(i, 1);

              //update form
              this.ratingForm.patchValue({
                id: this.rating.id,
                title: this.rating.title,
                rating: this.rating.rating,
                comment: this.rating.comment
              });
            }
          }
      });
    }

    //store ratings
    this.ratings = ratings;
  }

  goTo(location: string): void {
    window.location.hash = location;
  }
   
  submit() {

    //update rating
    this.rating = {
      id: this.ratingForm.value.id,
      title: this.ratingForm.value.title,
      rating: this.ratingForm.value.rating,
      comment: this.ratingForm.value.comment
    }

    //check if new or edit
    if(this.rating.id) { //edit

      this.ratingService.put(this.rating, this.item, this.type).subscribe(rating => {

        //store rating
        this.rating = rating;

        //update form
        this.ratingForm.patchValue({
          id: this.rating.id,
          title: this.rating.title,
          rating: this.rating.rating,
          comment: this.rating.comment
        });

        //saved
        this.saved = true;
      });
    }
    else { //new

      this.ratingService.post(this.rating, this.item, this.type).subscribe(rating => {

        //store rating
        this.rating = rating;

        //update form
        this.ratingForm.patchValue({
          id: this.rating.id,
          title: this.rating.title,
          rating: this.rating.rating,
          comment: this.rating.comment
        });

        //saved
        this.saved = true;
      });
    }
  }
}
