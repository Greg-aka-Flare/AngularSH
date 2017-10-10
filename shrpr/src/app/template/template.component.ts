import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-header',
  templateUrl: './template.header.html',
  styleUrls: ['./template.header.css'],
})

export class TemplateHeader implements OnInit {

  constructor() { }

  ngOnInit() {
  }
   //menuState:string = 'out';
  isBtnActive:boolean = false;
  toggleMenu() {
    // 1-line if statement that toggles the value:
    //this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.isBtnActive = !this.isBtnActive;
  }
}


@Component({
  selector: 'app-footer',
  templateUrl: './template.footer.html',
  styleUrls: ['./template.footer.css']
})
export class TemplateFooter implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
