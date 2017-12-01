import { Component, OnInit, OnDestroy } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LikeService } from "../like.service";
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public pagetemp:string;
  
  constructor() {
    
  }

  ngOnInit() {
    
  }

  

}

@Component({
  selector: 'app-header',
  templateUrl: './template.header.html',
  styleUrls: ['./template.header.css'],
  providers:[]
})

export class TemplateHeader implements OnInit, OnDestroy {

  isheaderShrunk: boolean = false;
  isBtnActive: boolean = false;
  counter: number = 0;
  subscription: Subscription;
  width = document.documentElement.clientWidth;
  pageType:string;
  
  private subscriptions = new Subscription();

  constructor(zone: NgZone, private likeService: LikeService) {

    this.pageType = this.likeService.pageTemp;
    
    
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

    this.subscription = this.likeService.getCounter().subscribe((count) => {
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
export class TemplateFooter implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}