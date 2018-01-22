import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import { Course } from "./course.interface";

@Injectable()
export class CourseService {

	api: string = environment.api;

	constructor(private http: HttpClient){}

	getCourses(
		group: number = 0, 
		limit: number = 0, 
		filter: boolean = false,
		excludes: number[] = []
	): Observable<any> {

		//create api endpoint
		let api = this.api + 'courses';

		if(group) api = this.updateQueryString('group', group, api);
		if(limit) api = this.updateQueryString('limit', limit, api);

		//check if we need to filter courses
		if(filter){

			//get likes/dislikes
			let likes = JSON.parse(localStorage.getItem('likes'));
			let dislikes = JSON.parse(localStorage.getItem('dislikes'));

			//if likes found
			if(likes){
				for(let like of likes){
					api = this.updateQueryString('likes[]', like, api);
				}
			}

			//if dislikes found
			if(dislikes){
				for(let dislike of dislikes){
					api = this.updateQueryString('dislikes[]', dislike, api);
				}
			}
		}

		//if we have courses to exclude
		if(excludes.length > 0){

			for(let exclude of excludes){
					api = this.updateQueryString('excludes[]', exclude, api);
			}
		}

		//get courses, add default state
		return this.http.get(api)
    .map(function(data: any) {

      let courses = data.courses;

      for(let course of courses) {
        course.state = 'default';
      }

      return data = data.courses;
    });
	}

	getCourse(id: number){

		//create api endpoint
		let api = this.api + 'course/' + id;

		return this.http.get(api);	
	}

	deleteCourse(id: number){
		return this.http.delete(this.api + id);
	}

	suggest(data){

		//create api endpoint
		let api = this.api + 'course/suggest';

		return this.http.post(api, data);	
	}

	private updateQueryString(key, value, url) {

		if (!url) url = window.location.href;
		var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
		    hash;

		if (re.test(url)) {
		    if (typeof value !== 'undefined' && value !== null)
		        return url.replace(re, '$1' + key + "=" + value + '$2$3');
		    else {
		        hash = url.split('#');
		        url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
		        if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
		            url += '#' + hash[1];
		        return url;
		    }
		}
		else {
		    if (typeof value !== 'undefined' && value !== null) {
		        var separator = url.indexOf('?') !== -1 ? '&' : '?';
		        hash = url.split('#');
		        url = hash[0] + separator + key + '=' + value;
		        if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
		            url += '#' + hash[1];
		        return url;
		    }
		    else
		        return url;
		}
	}
}