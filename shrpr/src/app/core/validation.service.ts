//import { Injectable } from "@angular/core";

//@Injectable()
export class ValidationService {

	static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'invalidPhone' : 'Should be only 10 digits.',
      'invalidAlphabets' : 'Only Alphabets are allowed!',
      'minlength': `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,16}           - Assert password is between 6 and 16 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
  static phonenoValidator(control) {
    // {6,16}           - Assert password is between 6 and 16 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/.[0-9]./)) {
      return null;
    } else {
      return { 'invalidPhone': true };
    }
  }
  static alphabetsValidator(control) {
    // {6,16}           - Assert password is between 6 and 16 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^[A-z]+$/)) {
      return null;
    } else {
      return { 'invalidAlphabets': true };
    }
  }
}

