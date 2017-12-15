import { Component, OnInit, NgZone } from '@angular/core';
declare var IN : any;
   
@Component({
    selector: 'linkedin-signin',
    template: ' <button (click)="onLinkedInLoad()" class="cta-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></button>',
    styleUrls: ['./linkedin.component.css']
  })
export class LinkedinComponent {

constructor() {
       
    }
    onLinkedInLoad() {
        IN.Event.on(IN, "auth", this.onLinkedInAuth);
      }
      public onLinkedInAuth() {
        IN.API.Profile("me")
          .fields("firstName", "lastName")
          .result(this.displayProfiles)
          .error(this.displayProfilesErrors);
      }
      public displayProfiles(profiles) {
        var linkedinmember = profiles.values[0];
        console.log(JSON.stringify(linkedinmember));
        console.log(linkedinmember.firstName + " " + linkedinmember.lastName);
      }
      public displayProfilesErrors(error) {
        console.log(error.message);
        console.log(error);
      }
       
            }