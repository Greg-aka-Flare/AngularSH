import { Component, OnInit } from '@angular/core';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-sortby',
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.css']
})
export class SortbyComponent implements OnInit {
  isfilterShrunk: boolean = false;

  constructor() { }
  
  @HostListener('window:scroll')onscroll = () => {
    if(window.pageYOffset > 0) {
         this.isfilterShrunk = true;
    } else {
         this.isfilterShrunk = false;
    }
  }
  ngOnInit() {
  }

}
