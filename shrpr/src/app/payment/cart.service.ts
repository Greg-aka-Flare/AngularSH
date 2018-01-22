import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Course } from '../courses/course.interface';

@Injectable()
export class CartService {

	total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	cart: Course[] = [];

  constructor() { }

  add(course: Course) {
  	//add to cart
    this.cart.push(course);
    this.cart = Array.from(new Set(this.cart));

  	//update total in cart
  	this.total.next(this.cart.length);
  }

  remove() {

  }

  added(course: Course) : boolean {
    return (this.cart.includes(course)) ? true : false;
  }
}