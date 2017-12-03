import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LandingGuard implements CanActivate {
  
  constructor(
    private router: Router,
  ) {}

  canActivate(): boolean {

    let access = localStorage.getItem('letmein');

    if(access == 'true'){
      
      return true;
    }
    else{

      this.router.navigate(['/']);

      return false;
    }
  }
}