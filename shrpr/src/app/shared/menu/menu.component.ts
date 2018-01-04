import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateHeader } from '../template/template.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isShow:boolean = true;
  constructor(private templateHeader: TemplateHeader, private auth: AuthService ) {
    
  }

  ngOnInit() {

    this.auth.me().subscribe(
      success => {
        this.isShow = false;
      },
      error => {
        this.isShow = true;
      }
    );
  }
  toggleMenu() {
    this.templateHeader.isBtnActive = !this.templateHeader.isBtnActive;
    
  }
  

}
