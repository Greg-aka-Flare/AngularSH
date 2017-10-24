import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import { Response } from "@angular/http";
import {trigger, state, style, transition, animate} from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

import { Course } from "../course.interface";
import { CourseService } from "../course.service"
import { TabsComponent } from "./tabs/tabs.component";

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})

export class HomeComponent implements OnInit {
  width = document.documentElement.clientWidth;

  isheaderShrunk: boolean = false;
  location: string = '';
  groups = ['For Fun', 'For Work', 'For Kids'];
  
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
    if (navigator.geolocation) { //check if we can get lat/lng

      //create location
      navigator.geolocation.getCurrentPosition(position => {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(lat, lng);

        let request = {
          latLng: latlng
        };

        //reverse geocode
        geocoder.geocode(request, (results, status) => {

          if (status == google.maps.GeocoderStatus.OK) {

            if (results[0] != null) {

              //get location
              this.location = this.findLocation(results[0].address_components);
            }
          }
        });
      });
    }
  }

  findLocation(components){      

    var city = false,
        state = false,
        zip = false,
        component,
        i, l, x, y;

      for(i = 0, l = components.length; i < l; ++i){

        //store component
        component = components[i];

        //check each type
        for(x = 0, y = component.types.length; x < y; ++ x){

          //depending on type, assign to var
          switch(component.types[x]){

            case 'neighborhood':
            city = component.long_name;
            break;

            case 'administrative_area_level_1':
            state = component.short_name;
            break;

            case 'postal_code':
            zip = component.short_name;
            break;
          }
        }
      }

      if(city && state && zip){

        return city + ', ' + state + ' ' + zip;
      }
      else if (city && state) { 

        return city + ', ' + state;
      } else {

        return '';
      }
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
