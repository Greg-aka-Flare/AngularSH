import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstitutionService {
	constructor(private http: Http){

	}
	
	getInstitution(id: number){
		return this.http.get('https://api.shrpr.co/api/institution/' + id)
			.map(
				(response: Response) => response.json()	
			);
			
	}
}