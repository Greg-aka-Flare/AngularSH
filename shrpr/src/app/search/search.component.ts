import { Component, OnInit, ViewChild } from '@angular/core';
import { CompleterService, CompleterItem, CompleterCmp } from 'ng2-completer';
import { Category } from '../category.interface';
import { CategoryService } from '../category.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  changedData: boolean = false;
  location: string = '';
  categories: Category[];
  protected dataService: CompleterData;

  protected groups  = [
  { 
    "image": "assets/img/fun-icon.png", 
    "title": "For Fun" 
  },
  { 
    "image":"assets/img/work-icon.png", 
    "title":"For Work" 
  },
  { 
    "image":"assets/img/kid-icon.png", 
    "title":"For Kids" 
  } ];

  @ViewChild("search") private search: CompleterCmp;
  
  constructor(
    private completerService: CompleterService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {

    this.categoryService.getCategories().subscribe(categories => {

      this.categories = categories;
    });

    this.dataService = this.completerService.local(this.groups, 'title', 'title').imageField('image');

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

  onKey(val) {

    if(!this.changeData){

      this.dataService = this.completerService.local(this.categories, 'name', 'name');

      this.changedData = true;
    }
  }

  onSelected(item: CompleterItem) {

    console.log(item);
  }
}