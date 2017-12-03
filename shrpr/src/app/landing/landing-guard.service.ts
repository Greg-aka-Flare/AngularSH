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

      var testV = 1;

      var pass1 = prompt('Please Enter Your Password', '');

      while(pass1 !== 'letmein'){
        alert('Password Incorrect');

        pass1 = prompt('Please Enter Your Password', '')
      }

      localStorage.setItem('letmein', 'true');
    }
  }
}