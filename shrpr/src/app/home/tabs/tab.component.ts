import { Component, Input } from '@angular/core';
import { TabsComponent } from './tabs.component';

@Component({
  selector: 'tab',
  template: `
		<div [hidden]="!active">
			<ng-content></ng-content>
		</div>
  `,
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
}
