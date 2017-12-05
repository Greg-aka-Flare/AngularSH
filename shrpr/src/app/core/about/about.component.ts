import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

	menu: boolean = true;
	search: boolean = true;

  constructor() { }

  ngOnInit() {

    let access = localStorage.getItem('letmein');

    if(access == 'true'){

    	this.menu = true;
    	this.search = true;
    }
    else{

    	this.menu = false;
    	this.search = false;
    }
  }
}