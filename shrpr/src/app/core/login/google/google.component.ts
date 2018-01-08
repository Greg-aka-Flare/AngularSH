import { Component, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button class="cta-google" id="googleBtn"><i class="fa fa-google-plus" aria-hidden="true"></i></button>',
  styleUrls: ['./google.component.css']
})
export class GoogleSigninComponent implements AfterViewInit {

  @Output() socialSignin: EventEmitter<any> = new EventEmitter();
  clientId: string = '666727355512-62rih9cd4sb7l0pes392pd55ria6039v.apps.googleusercontent.com';
  auth2: any;

  constructor(
    private element: ElementRef
  ) {}

  ngAfterViewInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({ 
        client_id: this.clientId,
        scope: 'profile email'
      });

      this.attachSignin(this.element.nativeElement.firstChild);
    });
  }

  attachSignin(element) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      console.log(googleUser);

      //emit data
      this.socialSignin.emit({ 
        'token': googleUser.getAuthResponse().id_token,
        'type': 'google'
      });

    }, 
    (error) => {
      console.log(JSON.stringify(error, undefined, 2));
    });
  }
}