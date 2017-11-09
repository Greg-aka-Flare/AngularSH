import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class UserService {
	constructor(private http: Http){

	}

	register(content: string){
		const body = JSON.stringify({content: content});
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/user', body, {headers: headers});
	}

	user(): Observable<any> {
		return this.http.get('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/users')
			.map(
				(response: Response) => {
					return response.json().users;
				}
			);
	}

	signup(name: string, email: string, password: string){
		return this.http.post('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/signup', 
			{ name: name, email: email, password: password },
			{ headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) });
	}

	login(email: string, password: string){
		return this.http.post('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/login', 
			{ email: email, password: password },
			{ headers: new Headers({ 'X-Requested-With': 'XMLHttpRequest' }) })
			.map((response: Response) => {
				const token = response.json().token;
				const base64Url = token.split('.')[1];
				const base64 = base64Url.replace('-', '+').replace('_', '/');
				return { token: token, decoded: JSON.parse(window.atob(base64)) }
			})
			.do(tokenData => {
				localStorage.setItem('token', tokenData.token);
			});
	}

	getToken() {
		return localStorage.getItem('token');
	}
}