import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { Response } from "@angular/http";
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TabsComponent } from "../shared/tabs/tabs.component";
import { StarRatingModule } from 'angular-star-rating';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { Courses } from "./courses.interface";
import { CoursesService } from "./courses.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:any;
  private id:number;
  course: any;
  courseCard:any[] = [];
  //subscription: Subscription;
  private subscriptions = new Subscription();
  institutiondata:string;
  
  details:any;
  
  width = document.documentElement.clientWidth;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) { 
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
       this.subscriptions.add(this.coursesService.getCourses(this.id)
     .subscribe(
       (response) => {
        this.courses = response;
        },
       (error: Response) => console.log(error)
     ));
     
  }
  

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

}





