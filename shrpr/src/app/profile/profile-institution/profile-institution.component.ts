import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { User } from '@app/core';

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