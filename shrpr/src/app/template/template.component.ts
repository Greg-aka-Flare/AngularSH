import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  
    constructor() {
    }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-header',
  templateUrl: './template.header.html',
  styleUrls: ['./template.header.css'],
})

export class TemplateHeader implements OnInit {

  isheaderShrunk: boolean = false;
  
    constructor(zone: NgZone) {
      window.onscroll = () => {
        zone.run(() => {
          if(window.pageYOffset > 0) {
               this.isheaderShrunk = true;
          } else {
               this.isheaderShrunk = false;
          }
        });
      }
    }

  ngOnInit() {
  }
   //menuState:string = 'out';
  isBtnActive:boolean = false;
  toggleMenu() {
    // 1-line if statement that toggles the value:
    //this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.isBtnActive = !this.isBtnActive;
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
