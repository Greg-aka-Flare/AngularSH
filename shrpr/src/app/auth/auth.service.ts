import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import decode from 'jwt-decode';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient){ }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return true;
  }

  me() {
    return this.http.post('https://api.shrpr.co/api/auth/me', {});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('https://api.shrpr.co/api/auth/login', {
      email: email,
      password: password
    })
  }
}