import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DislikeService {

  private dislikecounter: number = 0;
  private subject = new Subject<any>();
  private dislikeCoursesArray: any[] = [];
  /*
  dislikeArrayUpdate(id){
    this.dislikecounter++;
  	this.dislikeCoursesArray.push(id);
    this.subject.next(this.dislikecounter);
    console.log(id);
  }

  getdislikeCounter(): Observable<number> {
  	return this.subject.asObservable();
  }*/

}

