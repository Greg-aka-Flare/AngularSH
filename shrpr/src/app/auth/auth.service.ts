import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  api: string = environment.api;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  me(): Observable<any> {
    return this.http.post(this.api + 'auth/me', {})
      .map((data: any) => {
        if((data.name.split(" ").length - 1) == 1){ //store first/last name
          data.first = data.name.substr(0, data.name.indexOf(' '));
          data.last = data.name.substr(data.name.indexOf(' ') + 1);
        }

        return data;
      });
  }

  refresh(): Observable<any> {
    return this.http.post(this.api + 'auth/refresh', {})
      .map((token: any) => token.access_token)
      .do((token) => localStorage.setItem('access_token', token));
  }

  signup(data: any): Observable<any> {
    return this.http.post(this.api + 'auth/signup', data)
      .map((token: any) => token.access_token)
      .do((token) => localStorage.setItem('access_token', token));
  }

  google(data: any): Observable<any> {
    return this.http.post(this.api + 'auth/google', data)
      .map((token: any) => token.access_token)
      .do((token) => localStorage.setItem('access_token', token));
  }

  facebook(data: any): Observable<any> {
    return this.http.post(this.api + 'auth/facebook', data)
      .map((token: any) => token.access_token)
      .do((token) => localStorage.setItem('access_token', token));
  }

  linkedin(data: any): Observable<any> {
    return this.http.post(this.api + 'auth/linkedin', data)
      .map((token: any) => token.access_token)
      .do((token) => localStorage.setItem('access_token', token));
  }

  loggedIn(): boolean {
    return (this.getToken()) ? true : false;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.api + 'auth/login', {
      email: email,
      password: password
    })
      .map((token: any) => token.access_token)
      .do(token => localStorage.setItem('access_token', token));
  }

  logout() {
    //remove access token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('name');

    //redirect to login page
    this.router.navigateByUrl('login');
  }
}