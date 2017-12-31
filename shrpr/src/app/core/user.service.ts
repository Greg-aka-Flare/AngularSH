import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
	constructor(private http: Http){

	}

	register(content: string){
		const body = JSON.stringify({content: content});
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('https://api.shrpr.co/api/user', body, {headers: headers});
	}

	user(): Observable<any> {
		return this.http.get('https://api.shrpr.co/api/users')
			.map(
				(response: Response) => {
					return response.json().users;
				}
			);
	}

	signup(name: string, email: string, password: string){
		return this.http.post('https://api.shrpr.co/api/user', 
			{ name: name, email: email, password: password },
			{ headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) });
	}

  checkEmail(email: string) {

		return this.http.post('https://api.shrpr.co/api/user/check_email', 
			{ email: email },
			{ headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) });
  }
}