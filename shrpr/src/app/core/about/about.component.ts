import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  goTo(location: string): void {
    window.location.href = location;
  }
  constructor() {}

  ngOnInit() {}
}