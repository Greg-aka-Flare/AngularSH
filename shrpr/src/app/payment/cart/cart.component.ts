import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { Course } from '../../courses/course.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	courses: Course[] = [];

  constructor(
  	private cart: CartService
  ) { }

  ngOnInit() {

  	//get courses
  	this.cart.getCart().subscribe(courses => this.courses = courses);
  }
}