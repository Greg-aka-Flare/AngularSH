import { Component } from '@angular/core';

@Component({
  selector: 'app-marketing-form',
  templateUrl: './marketing-form.component.html',
  styleUrls: ['./marketing-form.component.css']
})
export class MarketingFormComponent {
  wasClicked = false;
  hasClicked = false;
  hasedClicked = false;
  
      onClick() {
          this.wasClicked= true;
      }
      onhasClick() {
        this.hasClicked= true;
    }

    onhasedClick() {
      this.hasedClicked= true;
  }
  constructor() {}
}