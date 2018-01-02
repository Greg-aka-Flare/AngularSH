import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';

@Component({
  selector: 'app-book-online-form',
  templateUrl: './book-online-form.component.html',
  styleUrls: ['./book-online-form.component.css']
})
export class BookOnlineFormComponent implements OnInit {
  menu: boolean = true;
  search: boolean = true;
  bookonlineForm: any;
  data: any = {};
  constructor( private fb: FormBuilder) {
   }

   ngOnInit() {
    
        this.bookonlineForm = this.fb.group({
          'firstName': ['', [Validators.required, ValidationService.alphabetsValidator]],
          'lastName': ['', [Validators.required, ValidationService.alphabetsValidator]],
          'email': ['', [Validators.required, ValidationService.emailValidator]],
          'phone': ['', [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
          'contactselect': ['', Validators.required],
          'drivinguber': ['', Validators.required],
          'drivingrating': ['', Validators.required],
        });

}
updateBookonline(){
  //assign user data
  this.data.firstName = this.bookonlineForm.value.firstName;
  this.data.lastName = this.bookonlineForm.value.lastName;
  this.data.email = this.bookonlineForm.value.email;
  this.data.phone = this.bookonlineForm.value.phone;
  this.data.contactselect = this.bookonlineForm.value.contactselect;
  this.data.drivinguber = this.bookonlineForm.value.drivinguber;
  this.data.drivingrating = this.bookonlineForm.value.drivingrating;

  console.log(
    'First Name:' + this.data.firstName,
    'Last name :' + this.data.lastName,
    'Email :' + this.data.email,
    'Phone :' + this.data.phone,
    'Best way to contact you?:' + this.data.contactselect,
    'How long have you been driving for Uber?:' + this.data.drivinguber,
    'What is your current driver rating?:' + this.data.drivingrating,
  )

}
}
