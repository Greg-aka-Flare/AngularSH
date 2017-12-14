import {Component, ElementRef, AfterViewInit} from '@angular/core';
declare const gapi: any;

@Component({
  selector: 'google-signin',
  template: '<button class="cta-google" id="googleBtn"><i class="fa fa-google-plus" aria-hidden="true"></i></button>',
  styleUrls: ['./google.component.css']
})
export class GoogleSigninComponent implements AfterViewInit {

  private clientId:string = '256107299050-j9qgiutqv2i1vuj2t9lrrt1bvu98fh35.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  isSignedIn:boolean = false;
  id: String;
  name: String;
  imageUrl:String;
  email: String;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
		//YOUR CODE HERE
		this.id = profile.getId();
		this.name = profile.getName();
		this.imageUrl = profile.getImageUrl();
		this.email = profile.getEmail();
		this.isSignedIn = googleUser.isSignedIn();


      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }
  signOut() {
	let auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut();
	this.isSignedIn = false;
  }
  ngAfterViewInit() {
    this.googleInit();
  }

}