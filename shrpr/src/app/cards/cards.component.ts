import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { StackConfig, Stack, Card, ThrowEvent, DragEvent, Direction, SwingStackComponent, SwingCardComponent} from 'angular2-swing';

import { Course } from "../course.interface";
import { CourseService } from "../course.service"

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
/*
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
}*/


export class CardsComponent implements OnInit {
  courses: Course[];
    
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  //cards: Array<any>;
  stackConfig: StackConfig;

  constructor(private courseService: CourseService) {

    this.stackConfig = {
      allowedDirections: [
        Direction.LEFT,
        Direction.RIGHT,
        Direction.DOWN
      ],
      throwOutConfidence: (offsetX: number, offsetY: number, targetElement: HTMLElement) => {
        // you would put ur logic based on offset & targetelement to determine
        // what is your throwout confidence
        const xConfidence = Math.min(Math.abs(offsetX) / targetElement.offsetWidth, 1);
        const yConfidence = Math.min(Math.abs(offsetY) / targetElement.offsetHeight, 1);

        return Math.max(xConfidence, yConfidence);
      },
      minThrowOutDistance: 400    // default value is 400
    };

    /*this.cards = [
      { name: 'clubs', symbol: '♣' },
      { name: 'diamonds', symbol: '♦' },
      { name: 'spades', symbol: '♠' }
    ];*/

  }

  ngOnInit() {
    this.courseService.getCourses()
      .subscribe(
        (courses: Course[]) => this.courses = courses,
        (error: Response) => console.log(error)
      );
  }

  ngAfterViewInit() {
    // ViewChild & ViewChildren are only available
    // in this function

    console.log(this.swingStack); // this is the stack
    console.log(this.swingCards); // this is a list of cards

    // we can get the underlying stack
    // which has methods - createCard, destroyCard, getCard etc
    console.log(this.swingStack.stack);

    // and the cards
    // every card has methods - destroy, throwIn, throwOut etc
    //this.swingCards.forEach((c) => console.log(c.getCard()));
    this.swingCards.forEach((course) => console.log(course.getCard()));

    // this is how you can manually hook up to the
    // events instead of providing the event method in the template
    this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => console.log('Manual hook: ', event));

    this.swingStack.dragstart.subscribe((event: DragEvent) => console.log(event));

    this.swingStack.dragmove.subscribe((event: DragEvent) => console.log(event));
  }

  // This method is called by hooking up the event
  // on the HTML element - see the template above
  onThrowOut(event: ThrowEvent) {
    console.log('Hook from the template', event.throwDirection);
  }

}
