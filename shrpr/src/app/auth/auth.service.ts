import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class AuthService {

  constructor(
  	private http: HttpClient, 
  	private jwtHelperService: JwtHelperService
  ) {}

  loggedIn() {
    const token: string = this.jwtHelperService.tokenGetter();

    if(!token) {
      return false;
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

    return !tokenExpired;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://shrpr.jdapwnzhx7.us-east-2.elasticbeanstalk.com/api/auth/login', {
      email: email,
      password: password
    }, {
      headers: new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest')
    })
  }
}