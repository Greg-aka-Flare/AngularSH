import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  interestForm: FormGroup;
  submitted: boolean = false;

  constructor() { }

  ngOnInit() {
    this.interestForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit() {

  	console.log('submitted');

    const email = this.interestForm.value.email;

    this.submitted = true;
  }
}