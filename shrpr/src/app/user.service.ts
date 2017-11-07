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

	login(content: string){
		const body = JSON.stringify({content: content});
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/login', body, {headers: headers})
			.map(
				(response: Response) => response.json()
			);	
	}
}