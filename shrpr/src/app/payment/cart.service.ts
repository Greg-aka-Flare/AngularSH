import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.interface';

@Injectable()
export class CartService {

  ids: number[] = [];
	total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	courses: Course[] = [];

  constructor(
    private courseService: CourseService
  ) { 

    //get any saved items in cart
    if(JSON.parse(localStorage.getItem('cart'))){

      //store ids
      this.ids = <number[]>JSON.parse(localStorage.getItem('cart'));

      //update total in cart
      this.total.next(this.ids.length);
    }
    else{

      //no ids
      this.ids = [];

      //update total in cart
      this.total.next(0);
    }
  }

  add(course: Course) {

    //add if not already in array
    if(this.courses.filter(val => val.semesters[0].id === course.semesters[0].id).length === 0) {

      this.courses.push(course);

      //add to ids array, remove duplicates
      this.ids.push(course.semesters[0].id);
      this.ids = Array.from(new Set(this.ids));

      //set localStorage
      localStorage.setItem('cart', JSON.stringify(this.ids));
    }

  	//update total in cart
  	this.total.next(this.courses.length);
  }

  remove() {

  }

  added(course: Course) : boolean {

    //check if already added
    if(this.ids.filter(val => val === course.semesters[0].id).length === 0) {

      return false;
    }
    else{

      return true;
    }
  }

  getCart(): Observable<any> {

    //get ids
    if(this.ids){

      //get courses from API
      return this.courseService.getCourses({
        'semesters[]': this.ids
      });
    }
    else{

      //return false
      return Observable.of(false);
    }
  }
}