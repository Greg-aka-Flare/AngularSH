import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class InstructorService {

	api: string = environment.api;

	constructor(
		private http: HttpClient
	) {}

	save(data: any){
		let api = this.api + 'instructor';

		return this.http.put(api, data);	
	}

	get(id): Observable<any>{
		let api = this.api + 'instructor/' + id;

		return this.http.get(api);
	}
}