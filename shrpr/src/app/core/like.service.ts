import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LikeService {

	private counter: number = 0;
  private subject = new Subject<any>();
  public likes: any = [];
  public dislikes: any = [];

  constructor(private http: HttpClient){ 

    if(JSON.parse(localStorage.getItem('likes')){
      this.likes = JSON.parse(localStorage.getItem('likes'));
    }
    else{
      this.likes = [];
    }

    if(JSON.parse(localStorage.getItem('dislikes')){
      this.dislikes = JSON.parse(localStorage.getItem('dislikes'));
    }
    else{
      this.dislikes = [];
    }
  }
 

  likeCounter(id){
  	this.counter++;

    this.likes.push(id);

    this.subject.next(this.counter);

    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  getCounter(): Observable<number> {
  	return this.subject.asObservable();
  }
  
  dislikeCounter(id){
    this.dislikes.push(id);

    localStorage.setItem('dislikes', JSON.stringify(this.dislikes));
  }
}