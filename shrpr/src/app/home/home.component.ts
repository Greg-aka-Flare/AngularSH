import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import {trigger, state, style, transition, animate} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { Course } from "../course.interface";
import { CourseService } from "../course.service"
import { TabsComponent } from "./tabs/tabs.component"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})

export class HomeComponent implements OnInit {
  width = document.documentElement.clientWidth;
  
  constructor() {
      const $resizeEvent = Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
        })
      
      $resizeEvent.subscribe(data => {
        this.width = data;
      });
  }

  ngOnInit() {
  }
}
