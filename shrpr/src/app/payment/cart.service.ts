import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course.interface';

@Injectable()
export class CartService {

  ids: number[] = [];
	total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	cart: Course[] = [];

  constructor(
    private courses: CourseService
  ) { 

    //get any saved items in cart
    if(JSON.parse(localStorage.getItem('cart'))){

      //store ids
      this.ids = <number[]>JSON.parse(localStorage.getItem('cart'));

      //get courses from API
      this.courses.getCourses({
        'semesters[]': this.ids
      })
      .subscribe(courses => this.cart = courses);
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
    if(this.cart.filter(val => val.semesters[0].id === course.semesters[0].id).length === 0) {

      this.cart.push(course);

      //add to ids array, remove duplicates
      this.ids.push(course.semesters[0].id);
      this.ids = Array.from(new Set(this.ids));

      //set localStorage
      localStorage.setItem('cart', JSON.stringify(this.ids));
    }

  	//update total in cart
  	this.total.next(this.cart.length);
  }

  remove() {

  }

  added(course: Course) : boolean {

    //check if already added
    if(this.cart.filter(val => val.semesters[0].id === course.semesters[0].id).length === 0) {

      return false;
    }
    else{

      return true;
    }
  }
}