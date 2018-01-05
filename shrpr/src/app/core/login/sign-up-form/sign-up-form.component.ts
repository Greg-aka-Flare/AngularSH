import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { Router } from "@angular/router";
import { UserInterface } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';
import { LikeService } from '../../../core/like.service';
import { AuthService } from '../../../auth/auth.service';
import { ValidationService } from '../../../core/validation.service';
import {} from '@types/googlemaps';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['../login.component.css']
})
export class SignUpFormComponent implements OnInit {

	private emailTimeout;
  name: string = '';
  email: string = '';
  data: any = {};
  signupForm: FormGroup;
  ProfileForm: FormGroup;
  signup: boolean = false;
  signupError: boolean = false;
  signupErrorText: string;
  currentLocation: boolean = true;

  constructor(
  	private fb: FormBuilder,
    private user: UserService,
    private http: HttpClient,
    private auth: AuthService,
    private likeService: LikeService,
    private router: Router
  ) {}

  ngOnInit() {

    //get local storage data
    if(localStorage.getItem('name')) this.name = localStorage.getItem('name');
    if(localStorage.getItem('email')) this.email = localStorage.getItem('email');

    //create signup form
    this.signupForm = this.fb.group({
      'name': ['', [Validators.required, ValidationService.alphabetsValidator]],
      'email': ['', [Validators.required, ValidationService.emailValidator ], this.validateEmailNotTaken.bind(this)],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      'termsConditionCheck': ['',Validators.required],
      'currentLocation': true,
    });

    //create profile form
    this.ProfileForm = this.fb.group({
      'role': ['', [Validators.required]]
    });
  }

  onSignup() {

    //assign user data
    this.data.name = this.signupForm.value.name;
    this.data.email = this.signupForm.value.email;
    this.data.password = this.signupForm.value.password;
    this.data.termsConditionCheck = this.signupForm.value.termsConditionCheck;
    this.data.currentLocation = this.signupForm.value.currentLocation;
    
    if(this.data.name && this.data.email && this.data.password && this.data.termsConditionCheck){
      this.signup = true;
      localStorage.setItem('email', this.data.email);
      localStorage.setItem('useCurrentLocation', 'false');
      localStorage.setItem('country', null);
      localStorage.setItem('state', null);
      localStorage.setItem('city', null);
      localStorage.setItem('zip', null);
      localStorage.setItem('address', null);
      if(this.data.currentLocation){
        console.log('use my cur loc');
        localStorage.setItem('useCurrentLocation', 'true');
        if(navigator.geolocation) { //check if we can get lat/lng
          //create location
          navigator.geolocation.getCurrentPosition(position => {
    
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
    
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(lat, lng);
    
            //reverse geocode
            geocoder.geocode({ 'location': latlng }, (results, status) => {
    
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0] != null) {
                  
                  const components = results[0].address_components;
                  
                  let city = '';
                  let state = '';
                  let zip = '';
                  let country = '';
                  let premise = '';
                  let sublocal2 = '';
                  let sublocal1 = '';
                  let localty = '';
                  let component, i, l, x, y;
                  
                  for(i = 0, l = components.length; i < l; ++i){
    
                    //store component
                    component = components[i];
            
                    //check each type
                    for(x = 0, y = component.types.length; x < y; ++ x){
            
                      //depending on type, assign to var
                      switch(component.types[x]){
            
                        case 'premise':
                        premise = component.long_name;
                        break;
                        
                        case 'sublocality_level_2':
                        sublocal2 = component.long_name;
                        break;
                        
                        case 'sublocality_level_1':
                        sublocal1 = component.long_name;
                        break;
                        
                        case 'locality':
                        localty = component.long_name;
                        break;
                          
                        case 'administrative_area_level_2':
                        city = component.long_name;
                        break;
                        
                        case 'neighborhood':
                        city = component.long_name;
                        break;
            
                        case 'administrative_area_level_1':
                        state = component.long_name;
                        break;
            
                        case 'postal_code':
                        zip = component.long_name;
                        break;
            
                        case 'country':
                        country = component.long_name;
                        break;
                      }
                    }
                  }
        
                  if(country){
                    localStorage.setItem('country', country);
                  }
                  if(state){
                    localStorage.setItem('state', state);
                  }
                  if(city){
                    localStorage.setItem('city', city);
                  }
                  if(zip){
                    localStorage.setItem('zip', zip);
                  }
                  if(premise || sublocal2 || sublocal1 || localty){
                    let addr = '';
                    if(premise){
                      addr = premise;
                    }
                    if(sublocal2){
                      if(addr){
                        addr += ', '+sublocal2;
                      } else {
                        addr = sublocal2;
                      }
                    }
                    if(sublocal1){
                      if(addr){
                        addr += ', '+sublocal1;
                      } else {
                        addr = sublocal1;
                      }
                    }
                    if(localty){
                      if(addr){
                        addr += ', '+localty;
                      } else {
                        addr = localty;
                      }
                    }
                    localStorage.setItem('address', addr);
                  }
    
                  //console.log(localStorage.getItem('city'));
                  //console.log(localStorage.getItem('state'));
                  //console.log(localStorage.getItem('zip'));
                  //console.log(localStorage.getItem('country'));
                  //console.log(localStorage.getItem('address'));
                  
                }
              }
            });
          });
        }
      }
    } 
    else {
      this.signup = false;
      console.log(false);
    }
  }

  onProfile(){

    //assign user role
    this.data.role = this.ProfileForm.value.role;

    //if user has role
    if(this.data.role){

      //create user
      this.user.signup(this.data).subscribe(
        success => this.onUserCreated(),
        error =>  console.log(error)
      );
    }
  }

  onUserCreated(){

    //log user in
    this.auth.login(this.data.email, this.data.password).subscribe(
      response => {

        //get all liked/disliked
        let likes = this.likeService.likes;
        let dislikes = this.likeService.dislikes;

        //create requests array
        let requests = [];

        //for every like, create new request
        for(let like of likes){

          let url = 'https://api.shrpr.co/api/course/' + like + '/like';

          requests.push(this.http.post(url, {}));
        }

        //for every dislike, create new request
        for(let dislike of dislikes){

          let url = 'https://api.shrpr.co/api/course/' + dislike + '/dislike';

          requests.push(this.http.post(url, {}));
        }

        //send all requests
        forkJoin(requests).subscribe(results => { console.log('Courses Liked/Disliked.') });

        //send to appropiate profile
        this.auth.me().subscribe(
          res => {

            //store data
            let id = res.id;
            let role = res.roles[0];

            //navigate to profile based on role
            if(role == 'student'){
              this.router.navigateByUrl('student/' + id);
            }
            else if(role == 'instructor'){
              this.router.navigateByUrl('instructor/' + id);
            }
            else if(role == 'institution'){
              this.router.navigateByUrl('institution/' + id);
            }
            else{
              this.router.navigateByUrl('/');
            }
          }
        );
      },
      error => console.log('Unable to login.')
    );
  }

  validateEmailNotTaken(control: FormControl): Promise<any> | Observable<any> {

    clearTimeout(this.emailTimeout);

  	const promise = new Promise<any>((resolve, reject) => {

      this.emailTimeout = setTimeout(() => {
	  		this.user.checkEmail(control.value).subscribe(
	  			success => resolve(null),
	  			error => resolve({ 'emailTaken': true }))
	  	}, 600);
  	});

  	return promise;
  }
}