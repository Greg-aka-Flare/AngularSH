import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateHeader } from '../template/template.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  constructor(private templateHeader: TemplateHeader ) {
    
  }

  ngOnInit() {

  }
  toggleMenu() {
    this.templateHeader.isBtnActive = !this.templateHeader.isBtnActive;
    
  }
  

}
