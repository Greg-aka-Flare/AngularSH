import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css'],
})
export class AddreviewComponent implements OnInit {
  goTo(location: string): void {
    window.location.hash = location;
  }
  data: any = {};
  reviewForm: any;
  constructor(private fb: FormBuilder) {
    
  }

  ngOnInit() {
    this.reviewForm = this.fb.group({
      'title': ['', [Validators.required]],
      'rating': ['', Validators.required],
      'comment': ['', [Validators.required, Validators.minLength(40)]],
    });
  }
   
  updateReview(){
    //get data to create user
    this.data.title = this.reviewForm.value.title;
    this.data.rating = this.reviewForm.value.rating;
    this.data.comment = this.reviewForm.value.comment;
 
    console.log(
      'Headline for Your Review:' + this.data.title,
      'Rating :' + this.data.rating,
      'Comment :' + this.data.comment,
   )
  }
}
