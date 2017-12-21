import { Component, OnInit, NgZone } from '@angular/core';
declare var IN : any;
   
@Component({
    selector: 'linkedin-signin',
    template: ' <button (click)="onLinkedInLoad()" class="cta-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></button>',
    styleUrls: ['./linkedin.component.css']
  })
export class LinkedinComponent {

constructor(private ngZone: NgZone) {
    
}


ngOnInit() {
  var linkedIn = document.createElement("script");
            linkedIn.type = "text/javascript";
            linkedIn.src = "http://platform.linkedin.com/in.js";
            linkedIn.innerHTML = "\n" +
               "api_key: 781zxklbjgz5a3\n" +
               "authorize: true\n" +
               "onLoad: onLinkedInLoad\n"+
               "scope: r_basicprofile r_emailaddress";
            document.head.appendChild(linkedIn);
            var script = document.createElement("script");
            script.type = "in/Login";
            var socialBox = document.getElementsByClassName('social-login');
            socialBox[0].appendChild(script);
  }

    ngAfterViewInit(){
      window['onLinkedInLoad'] = () => this.ngZone.run(() => this.onLinkedInLoad());
      window['displayProfiles'] = (profiles) => this.ngZone.run(() => this.displayProfiles(profiles));
      window['displayProfilesErrors'] = (error) => this.ngZone.run(() => this.displayProfilesErrors(error));
    }
    
    
      public onLinkedInLoad() {
        //console.log('click');
        IN.Event.on(IN, "auth", this.onLinkedInProfile);
      }

      public onLinkedInProfile() {
          IN.API.Profile("me")
          .fields("id", "firstName", "lastName", "email-address")
          .result(this.displayProfiles)
          .error(this.displayProfilesErrors);
      }
      public displayProfiles(profiles) {
          console.log(profiles);
      }
      public displayProfilesErrors(error) {
              console.debug(error);
      }
      //Invoke login window with button
      public liAuth() {
        IN.User.authorize(function () {
                  console.log('authorize callback');
        });
      }
}