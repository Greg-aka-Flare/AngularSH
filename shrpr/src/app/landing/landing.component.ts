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

  constructor() {

			var testV = 1;

			var pass1 = prompt('Please Enter Your Password', '');

			while(pass1 !== 'letmein'){
        alert('Password Incorrect');

        pass1 = prompt('Please Enter Your Password', '')
			}

      localStorage.setItem('letmein', 'true');
  }

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