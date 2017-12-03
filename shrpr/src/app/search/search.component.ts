import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem, CompleterCmp } from 'ng2-completer';
import { Category } from '../category.interface';
import { CategoryService } from '../category.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  location: string = '';

  public dataService: CompleterData;
  
  constructor(
    private completerService: CompleterService
  ) {}

  ngOnInit() {

    this.dataService = this.completerService.remote(
      'http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/search?str=', 
      'title', 
      'title'
    ).imageField('img');

    // if (navigator.geolocation) { //check if we can get lat/lng
      
    //         //create location
    //         navigator.geolocation.getCurrentPosition(position => {
      
    //           let lat = position.coords.latitude;
    //           let lng = position.coords.longitude;
      
    //           let geocoder = new google.maps.Geocoder();
    //           let latlng = new google.maps.LatLng(lat, lng);
      
    //           let request = {
    //             latLng: latlng
    //           };
      
    //           //reverse geocode
    //           geocoder.geocode(request, (results, status) => {
      
    //             if (status == google.maps.GeocoderStatus.OK) {
      
    //               if (results[0] != null) {
      
    //                 //get location
    //                 this.location = this.findLocation(results[0].address_components);
    //               }
    //             }
    //           });
    //         });
    //       }
  }

  findLocation(components){      
    
      //   var city = false,
      //       state = false,
      //       zip = false,
      //       component,
      //       i, l, x, y;
    
      //     for(i = 0, l = components.length; i < l; ++i){
    
      //       //store component
      //       component = components[i];
    
      //       //check each type
      //       for(x = 0, y = component.types.length; x < y; ++ x){
    
      //         //depending on type, assign to var
      //         switch(component.types[x]){
    
      //           case 'neighborhood':
      //           city = component.long_name;
      //           break;
    
      //           case 'administrative_area_level_1':
      //           state = component.short_name;
      //           break;
    
      //           case 'postal_code':
      //           zip = component.short_name;
      //           break;
      //         }
      //       }
      //     }
    
      //     if(city && state && zip){
    
      //       return city + ', ' + state + ' ' + zip;
      //     }
      //     else if (city && state) { 
    
      //       return city + ', ' + state;
      //     } else {
    
      //       return '';
      //     }
      }

  onSelected(item: CompleterItem) {

    console.log(item);
  }
}