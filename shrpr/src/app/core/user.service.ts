import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';

@Injectable()
export class UserService {

  api: string = environment.api;

	constructor(
		private http: HttpClient
	) {}

	user(): Observable<any> {
		return this.http.get(this.api + 'users');
	}

	book(data: any): Observable<any> {
		return this.http.post(this.api + 'user/book', data);
	}

  checkEmail(email: string): Observable<any> {
		return this.http.post(this.api + 'user/check_email', { email: email });
  }
}