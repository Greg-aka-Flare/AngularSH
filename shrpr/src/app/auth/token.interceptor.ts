import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  api: string = environment.api;
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private injector: Injector) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    
    let auth = this.injector.get(AuthService);
    let token = auth.getToken();

    return next.handle(this.addToken(req, token))
      .catch(error => {

        if(error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              if(token) {
                return this.handle401Error(req, next);
              }
              else {
                return this.logout();
              }
            case 401:
              if(token) {
    
                if(error.error.error === 'Token Invalid') {
                  //token blacklisted
                  return this.logout();
                }
                else if(error.url === (this.api + 'auth/refresh')){
                  //can't refresh token
                  return this.logout();
                }

                return this.handle401Error(req, next);
              }
              else {
                return this.logout();
              }
          }
        }
        else {
          return Observable.throw(error);
        }
      });
  }

  handle400Error(error) {
    if(error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logout();
    }

    return Observable.throw(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {

    let auth = this.injector.get(AuthService);

    if(!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return auth.refresh()
        .switchMap((newToken: string) => {
          if (newToken) {
              this.tokenSubject.next(newToken);
              return next.handle(this.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logout();
        })
        .catch(error => {

          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logout();
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } 
    else {

      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, token));
        });
    }
  }

  logout() {

    let auth = this.injector.get(AuthService);

    //logout
    auth.logout();

    // Route to the login page (implementation up to you)
    return Observable.throw('');
  }
}