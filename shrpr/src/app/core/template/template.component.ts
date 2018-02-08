import { Component, OnInit, Input } from '@angular/core';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CuriousService, TemplateService } from '@app/core';
import { CartService } from '../../payment/cart.service';
import { AuthService } from './../../auth/auth.service';

import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  
  constructor() {}
}

@Component({
  selector: 'app-header',
  templateUrl: './template.header.html',
  styleUrls: ['./template.header.css'],
  providers:[]
})
export class TemplateHeader implements OnInit {
  loggedIn: boolean = false;
  search: boolean = true;
  demo: boolean = true;
  isheaderShrunk: boolean = false;
  isBtnActive: boolean = false;
  cartTotal: number;
  counter: number = 0;
  width = document.documentElement.clientWidth;
  pageType: string;
  name: string = localStorage.getItem('name');

  constructor(
    private zone: NgZone, 
    private template: TemplateService,
    private curious: CuriousService,
    private auth: AuthService,
    private cart: CartService
  ) {
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
      $resizeEvent.subscribe(data => {
      this.width = data;
    });
    
    window.onscroll = () => {
      zone.run(() => {
        if(window.pageYOffset > 0) {
             this.isheaderShrunk = true;
        } else {
             this.isheaderShrunk = false;
        }
      });
    }
    window.onresize = () => {
      zone.run(() => {
        if(this.width < 768) {
          this.isBtnActive = false;
        } 
      });
    }
  }

  ngOnInit() {
    if(!name){ //if no name, attempt to fetch name

      //check if logged in
      this.loggedIn = this.auth.loggedIn();
      
      if(this.loggedIn) this.auth.me().subscribe(result => {
  
        //set name
        this.name = (result.first) ? result.first : result.name;
        
        //set in local storage
        localStorage.setItem('name', this.name);
      });
    }
    this.template.search.subscribe(value => this.search = value);
    this.template.demo.subscribe(value => this.demo = value);
    this.curious.likeCounter().subscribe(count => this.counter = count);
    this.cart.total.subscribe(total => this.cartTotal = total);
  }
  
  toggleMenu() {
    this.isBtnActive = !this.isBtnActive;
  }
  logout() {
    this.auth.logout();
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: './template.footer.html',
  styleUrls: ['./template.footer.css']
})
export class TemplateFooter {

  constructor() {}
}