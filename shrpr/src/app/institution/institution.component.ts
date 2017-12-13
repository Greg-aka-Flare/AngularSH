import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TabsComponent } from "../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Institution } from "./institution.interface";
import { InstitutionService } from "./institution.service";

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css']
})
export class InstitutionComponent implements OnInit, OnDestroy {
  institutions:any;
  private id:number;
  courseData: any;
  //subscription: Subscription;
  private subscriptions = new Subscription();
  institutiondata:string;
  
  details:any;
  
  width = document.documentElement.clientWidth;

  constructor(private institutionService: InstitutionService, private route: ActivatedRoute) { 
    let sub = this.subscriptions.add(this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      }))
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
      })
    
      this.subscriptions.add($resizeEvent.subscribe(data => {
      this.width = data;
    }));
  }
  
  ngOnInit() {
       this.subscriptions.add(this.institutionService.getInstitution(this.id)
     .subscribe(
       (response) => {
        this.institutions = response;
        this.details = JSON.parse(response.details);
        this.courseData = this.institutions.courses;
        },
       (error: Response) => console.log(error)
     ));
     
  }
  

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
