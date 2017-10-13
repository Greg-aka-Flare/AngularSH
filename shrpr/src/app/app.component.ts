import { Component } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent {
  title = 'app';
  istabFirstActive:boolean = true;
  istabSecondActive:boolean = false;
  toggletabSearch() {
    this.istabFirstActive = true;
    this.istabSecondActive = false;
  }
  toggletabBroese() {
    this.istabFirstActive = false;
    this.istabSecondActive = true;
  }
}
