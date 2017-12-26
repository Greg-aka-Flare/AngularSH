import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-curious',
  templateUrl: './curious.component.html',
  styleUrls: ['./curious.component.css']
})
export class CuriousComponent implements OnInit {

  width = document.documentElement.clientWidth;

  constructor() {}

  ngOnInit() {
    
    const $resizeEvent = Observable.fromEvent(window, 'resize')
    .map(() => {
      return document.documentElement.clientWidth;
    });
    
    $resizeEvent.subscribe(data => {
      this.width = data;
    });
  }
}