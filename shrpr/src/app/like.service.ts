import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LikeService {

	private counter: number = 0;
  private subject = new Subject<any>();
  private likeCoursesArray = new Array<{courseid:number, groupid:string}>();
  private dislikeCoursesArray = new Array<{courseid:number, groupid:string}>();

  incrementCounter(id, gid){
  	this.counter++;
    this.likeCoursesArray.push(
        {
          'courseid' : id,
          'groupid': gid
        }
      );
    this.subject.next(this.counter);
    //console.log('Like Courses id: ' + JSON.stringify(this.likeCoursesArray));
    localStorage.setItem('likekey',JSON.stringify(this.likeCoursesArray));
    console.log('New Like Courses id in Local Storage: '+ localStorage.getItem("likekey"));
  }

  getCounter(): Observable<number> {
  	return this.subject.asObservable();
  }
  
  dislikeCounter(id, gid){
    this.dislikeCoursesArray.push(
      {
        'courseid' : id,
        'groupid': gid
      }
    );
    //console.log('Dislike Courses id: ' + JSON.stringify(this.dislikeCoursesArray));
    localStorage.setItem('dislikekey',JSON.stringify(this.dislikeCoursesArray));
    console.log('New dislike Courses id in Local Storage: '+ localStorage.getItem("dislikekey"));
  }
}