import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "angular2-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/*export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
export class LoginComponent implements OnDestroy {
  public user;
  sub: any;
  constructor(public _auth: AuthService){ }
  
  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);this.user=data;}
    )
  }

  logout(){
    this._auth.logout().subscribe(
      (data)=>{console.log(data);this.user=null;}
    )
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
