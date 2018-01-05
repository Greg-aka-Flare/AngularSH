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
  user: any;

  constructor(
    private auth: AuthService,
    private templateHeader: TemplateHeader 
  ) {}

  ngOnInit() {
    this.loggedIn = this.auth.loggedIn();
    
    if(this.loggedIn) this.auth.me().subscribe(result => this.user = result);
  }

  toggleMenu() {
    this.templateHeader.isBtnActive = !this.templateHeader.isBtnActive;
  }

  logout() {
    this.auth.logout();
  }
}