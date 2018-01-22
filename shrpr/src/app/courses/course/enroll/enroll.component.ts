import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../../auth/auth.service';
import { CartService } from '../../../payment/cart.service';
import { Course } from '../../../courses/course.interface';
import { User } from '../../../core/user.interface';
import { UserService } from '../../../core/user.service';

@Component({
  selector: 'enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  @Input('course') course: Course;
  @Output() onAddCart: EventEmitter<boolean> = new EventEmitter;

  loggedIn: boolean = false;
  img: string = '';

  constructor( 
    private auth: AuthService,
    private cart: CartService,
    private user: UserService,
  ) {}

  ngOnInit() {
    
    //check if logged in
    this.loggedIn = this.auth.loggedIn();

    //get image
    this.img = this.course.semesters[0].primary_img;
  }

  addCart() {
    //add to cart
    this.cart.add(this.course);

    //added to cart
    this.onAddCart.emit(true);
  }

  close() {
    //not added to cart
    this.onAddCart.emit(false);
  }
}