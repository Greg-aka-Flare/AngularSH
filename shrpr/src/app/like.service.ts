import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LikeService {

	private counter: number = 0;
  private subject = new Subject<any>();
  private likeCoursesArray: any[] = [];

  incrementCounter(id){
  	this.counter++;
    this.likeCoursesArray.push(id);
    this.subject.next(this.counter);
    console.log(id);
  }

  getCounter(): Observable<number> {
  	return this.subject.asObservable();
  }
}