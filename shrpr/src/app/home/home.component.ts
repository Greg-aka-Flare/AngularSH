import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import {trigger, state, style, transition, animate} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { Course } from "../course.interface";
import { CourseService } from "../course.service"


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
  istabFirstActive:boolean = false;
  istabSecondActive:boolean = true;
  toggletabSearch() {
    this.istabFirstActive = true;
    this.istabSecondActive = false;
  }
  toggletabBroese() {
    this.istabFirstActive = false;
    this.istabSecondActive = true;
  }
  clickedtab1:boolean = false;
  clickedtab2:boolean = false;
  clickedtab3:boolean = false;
  clicked1() {
    this.clickedtab2 = false;
    this.clickedtab3 = false;
    this.clickedtab1 = !this.clickedtab1;
  }
  clicked2() {
    this.clickedtab2 = !this.clickedtab2;
    this.clickedtab3 = false;
    this.clickedtab1 = false;
  }
  clicked3() {
    this.clickedtab2 = false;
    this.clickedtab3 = !this.clickedtab3;
    this.clickedtab1 = false;
  }
}
