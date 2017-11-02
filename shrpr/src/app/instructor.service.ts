import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class InstructorService {
	constructor(private http: Http){

	}

	getInstructor(id: number){
		return this.http.get('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/instructor/' + id)
			.map(
				(response: Response) => response.json()
			);
	}

}