import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateHeader } from '../template/template.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  loggedIn: boolean = false;
  name: string = localStorage.getItem('name');
  myrole: string;
  myid:number;

  constructor(
    private auth: AuthService,
    private templateHeader: TemplateHeader 
  ) {
    
  }
  
  ngOnInit() {

    if(!name){ //if no name, attempt to fetch name

      //check if logged in
      this.loggedIn = this.auth.loggedIn();
      
      if(this.loggedIn) this.auth.me().subscribe(result => {

        //set name
        this.name = (result.first) ? result.first : result.name;
        //check user type
        this.myrole = '/'+result.roles[0];
        //check user id
        this.myid = result.id;
        //set in local storage
        localStorage.setItem('name', this.name);
      });
    }
  }

  toggleMenu() {
    this.templateHeader.isBtnActive = !this.templateHeader.isBtnActive;
  }

  logout() {
    this.auth.logout();
  }
}