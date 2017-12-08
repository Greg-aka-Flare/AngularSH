import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CoursesService {
	constructor(private http: Http){

	}

	getCourses(id: number){
		return this.http.get('https://api.shrpr.co/api/courses?group=' + id)
			.map(
				(response: Response) => response.json()
			);
	}

}