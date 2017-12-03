import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

	url: string = 'http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/';

	constructor(private http: HttpClient) {}

	getCategories(): Observable<any> {

		//create api endpoint
		let api = this.url + 'categories';

		//get categories
		return this.http.get(api)
    .map(function(data: any) {

      return data = data.categories;
    });
	}
}