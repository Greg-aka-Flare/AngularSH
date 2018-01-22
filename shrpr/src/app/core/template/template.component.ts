import { Component, OnInit, Input } from '@angular/core';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from '../../shared/search/search.component';
import { DemoComponent } from './schedule-demo/demo.component';
import { TemplateService } from './template.service';
import { CuriousService } from '../../core/curious.service';
import { CartService } from '../../payment/cart.service';

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

  search: boolean = true;
  demo: boolean = true;
  isheaderShrunk: boolean = false;
  isBtnActive: boolean = false;
  cartTotal: number = 0;
  counter: number = 0;
  width = document.documentElement.clientWidth;
  pageType: string;

  constructor(
    private zone: NgZone, 
    private template: TemplateService,
    private curious: CuriousService,
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

    this.template.search.subscribe(value => this.search = value);
    this.template.demo.subscribe(value => this.demo = value);
    this.curious.likeCounter().subscribe(count => this.counter = count);
    this.cart.total.subscribe(total => this.cartTotal = total);
  }

  toggleMenu() {
    this.isBtnActive = !this.isBtnActive;
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