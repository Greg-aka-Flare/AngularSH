import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Response } from "@angular/http";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Course } from "../../course/course.interface";
import { CourseService } from "../../course/course.service"
import { TabsComponent } from "../../shared/tabs/tabs.component";
import { SearchComponent } from '../../shared/search/search.component';
import { Carousel } from '../../shared/carousel/carousel.component';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})

export class HomeComponent implements OnInit {
  private subscriptions = new Subscription();
  width = document.documentElement.clientWidth;


  isheaderShrunk: boolean = false;
  location: string = '';
  groups = ['For Fun', 'For Work', 'For Kids'];
  
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
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
  
}
