import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class StudentService {

	api: string = environment.api;

	constructor(private http: HttpClient){}
	
	save(data: any){
		let api = this.api + 'student';

		return this.http.put(api, data);	
	}

	getStudent(id): Observable<any>{
		let api = this.api + 'student/' + id;

		return this.http.get(api);
	}
}