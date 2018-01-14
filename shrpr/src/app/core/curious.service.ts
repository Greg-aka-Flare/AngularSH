import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class CuriousService {

  api: string = environment.api;

	private counter: number = 0;
  private subject = new Subject<any>();
  public likes: number[] = [];
  public dislikes: number[] = [];

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ){ 

    if(JSON.parse(localStorage.getItem('likes'))){
      this.likes = <number[]>JSON.parse(localStorage.getItem('likes'));
    }
    else{
      this.likes = [];
    }

    if(JSON.parse(localStorage.getItem('dislikes'))){
      this.dislikes = <number[]>JSON.parse(localStorage.getItem('dislikes'));
    }
    else{
      this.dislikes = [];
    }
  }

  like(id: number | number[]): Observable<any> {

    if(id instanceof Array){ //multiple

      //add to likes array, remove duplicates
      this.likes.push(...id);
      this.likes = Array.from(new Set(this.likes));
    }
    else{ //single

      //add to likes array, remove duplicates
      this.likes.push(id);
      this.likes = Array.from(new Set(this.likes));
    }

    //increment counter
    this.counter++;

    //emit counter
    this.subject.next(this.counter);

    //clear localStorage
    return this.clear();
  }
  
  dislike(id: number | number[]): Observable<any> {

    if(id instanceof Array){ //multiple

      //add to dislikes array, remove duplicates
      this.dislikes.push(...id);
      this.dislikes = Array.from(new Set(this.dislikes));
    }
    else{ //single

      //add to dislikes array, remove duplicates
      this.dislikes.push(id);
      this.dislikes = Array.from(new Set(this.dislikes));
    }

    //clear localStorage
    return this.clear();
  }

  clear(): Observable<any> {

    if(this.auth.loggedIn()) { //check if logged in

      //create requests array
      let requests = [];

      //for every like, create new request
      for(let like of this.likes){

        let url = this.api + 'course/' + like + '/like';

        requests.push(this.http.post(url, {}));
      }

      //for every dislike, create new request
      for(let dislike of this.dislikes){

        let url = this.api + 'course/' + dislike + '/dislike';

        requests.push(this.http.post(url, {}));
      }

      //unset localstorage
      localStorage.removeItem('likes');
      localStorage.removeItem('dislikes');

      //send all requests
      return forkJoin(requests);
    }
    else{ //can't clear unless logged in

      return Observable.throw(false);
    }
  }

  likeCounter(): Observable<number> {
  	return this.subject.asObservable();
  }
}