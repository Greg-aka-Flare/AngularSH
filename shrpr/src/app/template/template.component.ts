import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-header',
  templateUrl: './template.header.html',
  styleUrls: ['./template.header.css'],
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

export class TemplateHeader implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  menuState:string = 'out';
  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

}


@Component({
  selector: 'app-footer',
  templateUrl: './template.footer.html',
  styleUrls: ['./template.footer.css']
})
export class TemplateFooter implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
