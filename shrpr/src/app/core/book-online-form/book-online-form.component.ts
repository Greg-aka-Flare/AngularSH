import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-online-form',
  templateUrl: './book-online-form.component.html',
  styleUrls: ['./book-online-form.component.css']
})
export class BookOnlineFormComponent implements OnInit {
  menu: boolean = true;
	search: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
