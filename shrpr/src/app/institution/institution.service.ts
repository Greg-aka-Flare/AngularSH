import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class InstitutionService {

	api: string = environment.api;

	constructor(
		private http: Http
	) {}
	
	getInstitution(id: number){
		return this.http.get(this.api + id)
			.map(
				(response: Response) => response.json()	
			);
			
	}
}