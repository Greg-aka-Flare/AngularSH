import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {

	loggedIn: boolean = false;
	public name: string = localStorage.getItem('name');
	myrole: string;
	myid:number;

	constructor(
		private http: HttpClient,
		//private auth: AuthService
	){ 

		/*if(!name){ //if no name, attempt to fetch name
			//check if logged in
			this.loggedIn = this.auth.loggedIn();
			
			if(this.loggedIn) this.auth.me().subscribe(result => {
		
			  //set name
			  this.name = (result.first) ? result.first : result.name;
			  //check user type
			  this.myrole = '/'+result.roles[0];
			  //check user id
			  this.myid = result.id;
			  //set in local storage
			  localStorage.setItem('name', this.name);
			});
		
		}*/

	}

	user(): Observable<any> {
		return this.http.get('https://api.shrpr.co/api/users');
	}

	signup(data: any): Observable<any> {
		return this.http.post('https://api.shrpr.co/api/user', data);
	}

	book(data: any): Observable<any> {
		return this.http.post('https://api.shrpr.co/api/user/book', data);
	}

  checkEmail(email: string): Observable<any> {
		return this.http.post('https://api.shrpr.co/api/user/check_email', { email: email });
  }

  
  



}