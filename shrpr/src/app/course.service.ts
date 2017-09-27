import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class CourseService {
	constructor(private http: Http){

	}
	getCourses(): Observable<any> {
		return this.http.get('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/courses')
			.map(
				(response: Response) => {
					return response.json().courses;
				}
			);
	}
}