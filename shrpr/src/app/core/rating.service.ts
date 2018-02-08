import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';

import { Course, Instructor, Rating, Student } from '@app/core';

@Injectable()
export class RatingService {

  api: string = environment.api;

	constructor(
		private http: HttpClient
	) {}

	all(item: Course | Instructor, type): Observable<any> {

		switch (type) {
			case 'courses':
				return this.http.get(this.api + 'ratings/courses/' + item.id);

			case 'instructors':
				return this.http.get(this.api + 'ratings/instructors/' + item.id);
		}
	}
}