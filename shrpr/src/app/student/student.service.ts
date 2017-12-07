import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StudentService {
	constructor(private http: Http){

	}
	
	getStudent(id: number){
		return this.http.get('https://api.shrpr.co/api/student/' + id)
			.map(
				(response: Response) => response.json()	
			);
			
	}
}