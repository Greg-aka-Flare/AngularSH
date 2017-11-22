import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class CourseService {

	url: string = 'http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/';

	constructor(private http: HttpClient){}

	addCourse(content: string){
		// const body = JSON.stringify({content: content});
		// const headers = new Headers({'Content-Type': 'application/json'});
		// return this.http.post('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course', body, {headers: headers});
	}

	getCourses(group: number = 0, limit: number = 0): Observable<any> {

		//create api endpoint
		let api = this.url + 'courses';

		if(group) api = this.updateQueryString('group', group, api);
		if(limit) api = this.updateQueryString('limit', limit, api);

		console.log(api);

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
		return this.http.get('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course/' + id)
		.map(
			(response: Response) => response.json()
		);	
	}
	
	updateCourse(id: number, newName: string){
		// const body = JSON.stringify({name: newName});
		// const headers = new Headers({'Content-Type': 'application/json'});
		// return this.http.put('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course/' + id, body, {headers: headers})
		// 	.map(
		// 		(response: Response) => response.json()
		// 	);
	}

	deleteCourse(id: number){
		return this.http.delete('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/course/' + id);
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