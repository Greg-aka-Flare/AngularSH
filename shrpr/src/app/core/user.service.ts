import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

	constructor(private http: HttpClient){ }

	user(): Observable<any> {
		return this.http.get('https://api.shrpr.co/api/users');
	}

	signup(data: any){
		return this.http.post('https://api.shrpr.co/api/user', data,
			{ headers: new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest') });
	}

  checkEmail(email: string) {

		return this.http.post('https://api.shrpr.co/api/user/check_email', 
			{ email: email },
			{ headers: new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest') });
  }
}