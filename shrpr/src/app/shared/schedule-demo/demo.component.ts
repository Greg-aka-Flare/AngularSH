import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateHeader } from '../template/template.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  goTo(location: string): void {
    window.location.hash = location;
  }
  constructor(private templateHeader: TemplateHeader ) {
    
  }

  ngOnInit() {

  }
  toggleMenu() {
    this.templateHeader.isBtnActive = !this.templateHeader.isBtnActive;
    
  }
  

}
