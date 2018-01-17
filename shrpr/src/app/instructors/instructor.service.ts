import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstructorService {
	constructor(private http: Http){

	}

	getInstructor(id: number){
		return this.http.get('https://api.shrpr.co/api/instructor/' + id)
			.map(
				(response: Response) => response.json()
			);
	}

}