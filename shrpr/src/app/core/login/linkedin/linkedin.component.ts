import { Component, OnInit, NgZone } from '@angular/core';

declare var IN : any;
   
@Component({
  selector: 'linkedin-signin',
  template: '<button (click)="onClick()" class="cta-linkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></button>',
  styleUrls: ['./linkedin.component.css']
})
export class LinkedinComponent {

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    var linkedIn = document.createElement("script");
        linkedIn.type = "text/javascript";
        linkedIn.src = "https://platform.linkedin.com/in.js";
        linkedIn.innerHTML = "\n" +
           "api_key: 781zxklbjgz5a3\n" +
           "authorize: true\n" +
           "onLoad: onLinkedInLoad\n"+
           "scope: r_basicprofile r_emailaddress";
        document.head.appendChild(linkedIn);
  }

  ngAfterViewInit(){
    window['onLinkedInLoad'] = () => this.ngZone.run(() => this.onLinkedInLoad());
    window['displayProfiles'] = (profiles) => this.ngZone.run(() => this.displayProfiles(profiles));
    window['displayProfilesErrors'] = (error) => this.ngZone.run(() => this.displayProfilesErrors(error));
  }

  public onLinkedInLoad() {
    IN.Event.on(IN, 'auth', this.onLinkedInProfile);
  }

  public onLinkedInProfile() {
    IN.API.Profile('me')
    .fields('id', 'firstName', 'lastName', 'email-address')
    .result(this.displayProfiles)
    .error(this.displayProfilesErrors);
  }

  public displayProfiles(profiles) {
    console.log(profiles);
  }

  public displayProfilesErrors(error) {
    console.debug(error);
  }

  public onClick(){
    IN.UI.Authorize().place(); 
    IN.Event.on(IN, 'auth', this.onLinkedInProfile);
  }
}