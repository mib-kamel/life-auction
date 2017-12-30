import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {

  @ViewChild('allNotificationsContainer') allNotificationsContainer;

  constructor() { }

  ngOnInit() {
  }

  showNotification($event) {
    this.allNotificationsContainer.showNotification($event);
  }

}
