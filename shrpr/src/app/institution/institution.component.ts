import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TabsComponent } from "../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Course } from "../courses/course.interface";
import { CourseService } from "../courses/course.service";
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
  courses: any;
  courseCard:any[] = [];
  //subscription: Subscription;
  private subscriptions = new Subscription();
  institutiondata:string;
  
  details:any;
  
  width = document.documentElement.clientWidth;

  constructor(private institutionService: InstitutionService, private route: ActivatedRoute, private courseService: CourseService) { 
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
    this.subscriptions.add(this.courseService.getCourses()
    .subscribe(
      (courses) => {
       this.courses = courses;
       if(this.courses){
        for(var i = 0, l = this.courses.length; i < l; i++) {
          if( this.courses[i].institution.id == this.id){
              this.courseCard.push(this.courses[i]);
          } 
        }
       }
      },
      (error: Response) => console.log(error)
      
    ));

       this.subscriptions.add(this.institutionService.getInstitution(this.id)
     .subscribe(
       (response) => {
        this.institutions = response;
        },
       (error: Response) => console.log(error)
     ));
     
  }
  

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}
