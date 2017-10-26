import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LikeService {

	private counter: number = 0;
  private subject = new Subject<any>();

  incrementCounter(){
  	this.counter++;

  	this.subject.next(this.counter);
  }

  getCounter(): Observable<number> {
  	return this.subject.asObservable();
  }
}