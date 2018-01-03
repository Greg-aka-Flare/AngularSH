import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { ValidationService } from './../core/validation.service';
import { ControlMessagesComponent } from './../shared/control-messages/control-messages.component';

@Component({
  selector: 'app-marketing-form',
  templateUrl: './marketing-form.component.html',
  styleUrls: ['./marketing-form.component.css']
})
export class MarketingFormComponent {
  wasClicked = false;
  hasClicked = false;
  hasedClicked = false;
  data: any = {};
  scheduleFreeDemoform: any;

      onClick() {
          this.wasClicked= true;
      }
      onhasClick() {
        this.hasClicked= true;
    }

    onhasedClick() {
      this.hasedClicked= true;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.scheduleFreeDemoform = this.fb.group({
      'firstName': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'lastName': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'organizationName': ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'countryCode': ['', Validators.required],
      'phone': ['', [Validators.required, ValidationService.phonenoValidator, Validators.minLength(10)]],
      'organizationSize': ['', Validators.required],
      'researchStage': ['', Validators.required],
    });
  }
  updateFreeDemo(){
    //get data to create user
    this.data.firstName = this.scheduleFreeDemoform.value.firstName;
    this.data.lastName = this.scheduleFreeDemoform.value.lastName;
    this.data.organizationName = this.scheduleFreeDemoform.value.organizationName;
    this.data.email = this.scheduleFreeDemoform.value.email;
    this.data.countryCode = this.scheduleFreeDemoform.value.countryCode;
    this.data.phone = this.scheduleFreeDemoform.value.phone;
    this.data.organizationSize = this.scheduleFreeDemoform.value.organizationSize;
    this.data.researchStage = this.scheduleFreeDemoform.value.researchStage;
 
    console.log(
      'First Name:' + this.data.firstName,
      'Last Name :' + this.data.lastName,
      'Organization Name :' + this.data.organizationName,
      'Email:' + this.data.email,
      'Country Code :' + this.data.countryCode,
      'Phone :' + this.data.phone,
      'Organization Size:' + this.data.organizationSize,
      'Research Stage :' + this.data.researchStage
   )
  }
}