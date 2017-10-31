import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
declare var google;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  location: string = '';
  protected dataService: CompleterData;
  protected searchData  = [
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
  
  constructor(private completerService: CompleterService) { 
    this.dataService = completerService.local(this.searchData, 'title', 'title').imageField('image');
    
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
}