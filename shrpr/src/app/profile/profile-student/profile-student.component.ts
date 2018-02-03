import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { StudentService } from '../../student/student.service';
import { ValidationService } from '../../core/validation.service';
import { ControlMessagesComponent } from '../../shared/control-messages/control-messages.component';
import { User } from '../../core/user.interface';

@Component({
  selector: 'profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  @Input('user') user: User;

  addressForm: FormGroup;
  profileForm: FormGroup;
  descriptionForm: FormGroup;
  showProfile: boolean = false;
  showAddress: boolean = false;
  showAbout: boolean = false;

  constructor(
    private fb: FormBuilder,
    private student: StudentService
  ) {}

  ngOnInit() {

    //if no addresses
    if(this.user.student.addresses.length === 0){

      //create empty
      this.user.student.addresses.push({
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      });

      //if localstorage exists, pull values in
      if(localStorage.getItem('useCurrentLocation')) {
        if(localStorage.getItem('address')) this.user.student.addresses[0].streetAddress = localStorage.getItem('address');
        if(localStorage.getItem('city')) this.user.student.addresses[0].city = localStorage.getItem('city');
        if(localStorage.getItem('state')) this.user.student.addresses[0].state = localStorage.getItem('state');
        if(localStorage.getItem('zip')) this.user.student.addresses[0].zip = localStorage.getItem('zip');
        if(localStorage.getItem('country')) this.user.student.addresses[0].country = localStorage.getItem('country');
      }
    }

    //if no details, fill in empty data
    if(!this.user.student.details) {

      this.user.student.details = {
        description: '',
        url: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        yelp: '',
        pinterest: '',
        secondary_email: ''
      }
    }
    
    //create form groups
    this.addressForm = this.fb.group({
      'addressStreet': [this.user.student.addresses[0].streetAddress, Validators.required],
      'addressCity': [this.user.student.addresses[0].city, Validators.required],
      'addressState': [this.user.student.addresses[0].state, Validators.required],
      'addressZip': [this.user.student.addresses[0].zip, Validators.required],
      'addressCountry': [this.user.student.addresses[0].country, Validators.required],
      'addressPhone': [this.user.student.phone, [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'addressEmail': [this.user.student.details.secondary_email, [Validators.required, ValidationService.emailValidator]]
    });
  
    this.profileForm = this.fb.group({
      'name': [this.user.name, [Validators.required, ValidationService.alphabetsValidator]],
      'profileImage': [this.user.profile_img],
      'url':  [this.user.student.details.url],
      'twitter': [this.user.student.details.twitter],
      'facebook': [this.user.student.details.facebook],
      'linkedin': [this.user.student.details.linkedin],
      'yelp':  [this.user.student.details.yelp],
      'pinterest': [this.user.student.details.pinterest],
    });

    this.descriptionForm = this.fb.group({
      'description': [this.user.student.details.description, [Validators.required, Validators.minLength(40)]],
    });
  }

  updateAddress(){
    //create data
    const data = {
      phone: this.addressForm.value.addressPhone,
      addresses: [ {
        type: 'primary',
        streetAddress: this.addressForm.value.addressStreet,
        city: this.addressForm.value.addressCity,
        state: this.addressForm.value.addressState,
        zip: this.addressForm.value.addressZip,
        country: this.addressForm.value.addressCountry
      } ],
      details: {
        secondary_email: this.addressForm.value.addressEmail
      }
    };

    //save data
    this.student.save(data).subscribe(
      success => {
        //update data
        this.user.student.phone = data.phone;
        this.user.student.addresses = data.addresses;
        this.user.student.details = {...this.user.student.details, ...data.details};

        //hide popup
        this.showAddress = !this.showAddress;
      }
    );
  }

  updateProfile(){

    //create data
    const data = {
      name: this.profileForm.value.name,
      profile_img: this.profileForm.value.profileImage,
      details: {
        url: this.profileForm.value.url,
        yelp: this.profileForm.value.yelp,
        twitter: this.profileForm.value.twitter,
        facebook: this.profileForm.value.facebook,
        linkedin: this.profileForm.value.linkedin,
        pinterest: this.profileForm.value.pinterest
      }
    };

    //save data
    this.student.save(data).subscribe(
      success => {
        //update data
        this.user.name = data.name;
        this.user.profile_img = data.profile_img;
        this.user.student.details = {...this.user.student.details, ...data.details};

        //hide popup
        this.showProfile = !this.showProfile;
      }
    );
  }

  updateDescription(){

    //create data
    const data = {
      details: {
        description: this.descriptionForm.value.description
      }
    };

    //save data
    this.student.save(data).subscribe(
      success => {
        //update data
        this.user.student.details = {...this.user.student.details, ...data.details};

        //hide popup
        this.showAbout = !this.showAbout;
      }
    );
  }
}