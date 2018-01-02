import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

	constructor(private http: HttpClient){ }

	user(): Observable<any> {
		return this.http.get('https://api.shrpr.co/api/users');
	}

	signup(data: any): Observable<any> {
		return this.http.post('http://api.shrpr.co/api/user', data);
	}

	book(data: any): Observable<any> {
		return this.http.post('https://api.shrpr.co/api/user/book', data);
	}

  checkEmail(email: string): Observable<any> {
		return this.http.post('https://api.shrpr.co/api/user/check_email', { email: email });
  }
}