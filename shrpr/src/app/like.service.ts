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
  private oldLikeValue;
  private oldDislikeValue;

  constructor(){
    this.oldLikeValue = JSON.parse(localStorage.getItem("likes"));
    this.oldDislikeValue = JSON.parse(localStorage.getItem('dislikes'));
  }
 

  likeCounter(id){
  	this.counter++;
    this.likeCoursesArray.push(id);

    this.subject.next(this.counter);

    localStorage.setItem('likes', JSON.stringify(this.likeCoursesArray));

    console.log('New Like Courses id in Local Storage: '+ localStorage.getItem("likes"));
  }

  getCounter(): Observable<number> {
  	return this.subject.asObservable();
  }
  
  dislikeCounter(id){
    this.dislikeCoursesArray.push(id);

    localStorage.setItem('dislikes', JSON.stringify(this.dislikeCoursesArray));
    console.log('New dislike Courses id in Local Storage: '+ localStorage.getItem("dislikes"));
  }
  
}