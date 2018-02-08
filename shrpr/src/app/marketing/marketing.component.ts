import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateService } from '@app/core';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit, OnDestroy {

  constructor(
  	private template: TemplateService
  ) {}

  ngOnInit() {
    this.template.demo.next(true);
    this.template.search.next(false);
  }

  ngOnDestroy() {
    this.template.demo.next(false);
    this.template.search.next(true);
  }
}