import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabsComponent } from "../../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../core/user.interface';

@Component({
  selector: 'profile-institution',
  templateUrl: './profile-institution.component.html',
  styleUrls: ['./profile-institution.component.css']
})
export class ProfileInstitutionComponent implements OnInit, OnDestroy {

  @Input('user') user: User;

  institutions:any;
  courses: any[];
  courseData: any;
  courseTotal: string = '';
  //subscription: Subscription;
  private subscriptions = new Subscription();
  
  details:any;
  
  width = document.documentElement.clientWidth;

  constructor() { 
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;
    }));
  }
  
  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}