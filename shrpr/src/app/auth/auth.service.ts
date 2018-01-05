import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  me(): Observable<any> {
    return this.http.post('https://api.shrpr.co/api/auth/me', {});
  }

  refresh(): Observable<any> {
    return this.http.post('https://api.shrpr.co/api/auth/refresh', {})
      .map((token: any) => token.access_token)
      .do((token) => localStorage.setItem('access_token', token));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('https://api.shrpr.co/api/auth/login', {
      email: email,
      password: password
    })
      .map((token: any) => token.access_token)
      .do(token => localStorage.setItem('access_token', token));
  }

  logout() {
    //remove access token from local storage
    localStorage.removeItem('access_token');

    //redirect to login page
    this.router.navigateByUrl('login');
  }
}