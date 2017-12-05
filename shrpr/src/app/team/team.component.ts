import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

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
