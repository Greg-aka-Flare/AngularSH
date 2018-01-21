import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { MenuComponent } from './menu/menu.component';
import { SearchComponent } from '../../shared/search/search.component';
import { DemoComponent } from './schedule-demo/demo.component';
import { TemplateService } from './template.service';
import { CuriousService } from '../../core/curious.service';

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
export class TemplateHeader implements OnInit, OnDestroy {

  search: boolean = true;
  demo: boolean = true;
  isheaderShrunk: boolean = false;
  isBtnActive: boolean = false;
  counter: number = 0;
  subscription: Subscription;
  width = document.documentElement.clientWidth;
  pageType: string;
  
  private subscriptions = new Subscription();

  constructor(
    private zone: NgZone, 
    private template: TemplateService,
    private curious: CuriousService
  ) {
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;
    }));
    
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

    this.subscription = this.curious.likeCounter().subscribe((count) => {
      this.counter = count;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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