// Angular
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pt-deviation-alert',
  templateUrl: './pt-deviation-alert.component.html',
})
export class WidgetDeviationAlertComponent {
  @Input() cssClasses = '';
  @Input() deviationList: any[] = [];
  currentTab = 'Day';
  fullWidth: boolean = false;
  @Output() fullWidthClicked = new EventEmitter<object>();

  constructor() {
  
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

  toggleFullWidth() {
    this.fullWidth = !this.fullWidth;
    this.fullWidthClicked.emit({ fullWidth: this.fullWidth});
  }
}
