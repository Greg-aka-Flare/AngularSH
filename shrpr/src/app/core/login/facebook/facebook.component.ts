import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

declare const FB: any;

@Component({
  selector: 'facebook-signin',
  template: '<button class="cta-facebook" (click)="onClick()"><i class="fa fa-facebook" aria-hidden="true"></i></button>',
  styleUrls: ['./facebook.component.css']
})

export class FacebookLoginComponent {

  @Output() socialSignin: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {
    FB.init({
        appId      : '277825696077581',
        cookie     : false,
        xfbml      : true,
        version    : 'v2.11' 
    });
  }

  onClick() {
    FB.getLoginStatus(response => {

      if(response.status == 'connected'){ //already logged in
        //emit data
        this.socialSignin.emit({ 
          'token': response.authResponse.accessToken,
          'type': 'facebook'
        });
      }
      else { //prompt to login

        FB.login(response => {

          //emit data
          this.socialSignin.emit({ 
            'token': response.authResponse.accessToken,
            'type': 'facebook'
          });
        }, { scope: 'public_profile, email' });
      }
    });
  }
}