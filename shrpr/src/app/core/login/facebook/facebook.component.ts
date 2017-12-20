import {Component, OnInit } from '@angular/core';

declare const FB: any;

@Component({
    selector: 'facebook-login',
    template: '<button class="cta-facebook" (click)="onFacebookLoginClick()"><i class="fa fa-facebook" aria-hidden="true"></i></button>',
    styleUrls: ['./facebook.component.css']
})

export class FacebookLoginComponent implements OnInit {
    constructor() {
        FB.init({
            appId      : '1747597735535844',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.11' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
        FB.login(function(response) {
            if (response.authResponse) {
             FB.api('https://graph.facebook.com/me?fields=id,name,first_name,email,gender,picture{height,width,url,is_silhouette},age_range,friends.limit(10),birthday', function(response) {
                console.log(response);
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
    ngOnInit() {
        FB.getLoginStatus(response => {
            
        });
    }
}