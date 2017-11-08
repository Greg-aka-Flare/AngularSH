import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class CourseService {
	constructor(private http: Http){

	}

	addCourse(content: string){
		const body = JSON.stringify({content: content});
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course', body, {headers: headers});
	}

	getCourses(): Observable<any> {
		return this.http.get('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/courses')
			.map(
				(response: Response) => {
					return response.json().courses;
				}
			);
	}

	getCourse(id: number){
		return this.http.get('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course/' + id)
		.map(
			(response: Response) => response.json()
		);	
	}
	
	updateCourse(id: number, newName: string){
		const body = JSON.stringify({name: newName});
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.put('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course/' + id, body, {headers: headers})
			.map(
				(response: Response) => response.json()
			);
	}

	deleteCourse(id: number){
		return this.http.delete('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course/' + id);
	}

}