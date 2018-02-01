import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { Category } from './category.interface';

@Injectable()
export class CategoryService {

  api: string = environment.api;

	constructor(
		private http: HttpClient
	) {}

	all(): Observable<any> {

		return this.http.get(this.api + 'categories');
	}

	primary(categories: Category[]): Category[] {

		return categories.filter(x => x.parent === null);
	}

	children(categories: Category[], i: number): Category[] {

		return categories.filter(x => x.parent == i);
	}
}