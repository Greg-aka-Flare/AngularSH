import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateHeader } from '../template/template.component';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css'],
})
export class AddreviewComponent implements OnInit {
  goTo(location: string): void {
    window.location.hash = location;
  }
  constructor( ) {
    
  }

  ngOnInit() {

  }
   

}
