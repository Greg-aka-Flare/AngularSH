import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { Course } from './course.interface';

@Injectable()
export class CourseService {

	api: string = environment.api;

	constructor(private http: HttpClient){}

	getCourses(parameters: any = {}): Observable<any> {

		//create api endpoint
		let api = this.api + 'courses';

		if(parameters.filter){

			//get likes/dislikes
			let likes = JSON.parse(localStorage.getItem('likes'));
			let dislikes = JSON.parse(localStorage.getItem('dislikes'));

			//if likes found
			if(likes) parameters["likes[]"] = likes;
			if(dislikes) parameters["dislikes[]"] = dislikes;

			//delete filter parameter
			delete parameters['filter'];
		}

		let Params = new HttpParams({ fromObject: parameters });

		//get courses, add default state
		return this.http.get(api, { params: Params })
    .map(function(data: any) {

      let courses = data.courses;

      for(let course of courses) {
        course.state = 'default';
      }

      return data = data.courses;
    });
	}

	getCourse(id: number) {

		//create api endpoint
		let api = this.api + 'course/' + id;

		return this.http.get(api);	
	}

	create(data): Observable<any> {

		//create api endpoint
		let api = this.api + 'course';

		return this.http.post(api, data);	
	}

	deleteCourse(id: number) {
		return this.http.delete(this.api + id);
	}

	suggest(data) {

		//create api endpoint
		let api = this.api + 'course/suggest';

		return this.http.post(api, data);	
	}
}