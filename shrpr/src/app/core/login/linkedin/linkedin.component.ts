import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var IN : any;
   
@Component({
  selector: 'linkedin-signin',
  template: '<button (click)="onClick()" class="cta-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></button>',
  styleUrls: ['./linkedin.component.css']
})
export class LinkedinComponent implements OnInit {

  @Output() socialSignin: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    var linkedIn = document.createElement("script");
        linkedIn.type = "text/javascript";
        linkedIn.src = "https://platform.linkedin.com/in.js";
        linkedIn.innerHTML = "\n" +
           "api_key: 77jab9j5wl5r3j\n" +
           "authorize: true\n" +
           "scope: r_basicprofile r_emailaddress";
        document.head.appendChild(linkedIn);
  }

  onLinkedInProfile() {

    IN.API.Profile('me')
    .fields('id', 'first-name', 'last-name', 'email-address', 'picture-url')
    .result(result => {

      //emit data
      this.socialSignin.emit({ 
        'linkedin_id': result.values[0].id,
        'name': result.values[0].firstName + ' ' + result.values[0].lastName,
        'email': result.values[0].emailAddress,
        'profile_img': (result.values[0].pictureUrl) ? result.values[0].pictureUrl : '',
        'type': 'linkedin'
      });
    })
    .error(error => console.log(error));
  }

  onClick() {

    IN.UI.Authorize().place(); 
    IN.Event.on(IN, 'auth', this.onLinkedInProfile, this);
  }
}