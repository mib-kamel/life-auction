import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @ViewChild('allNotificationsContainer') allNotificationsContainer: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  showNotification(event) {
    const error = this.renderer.createElement('div');
    this.renderer.addClass(error, 'notification');
    this.renderer.addClass(error, event.type);
    const message = this.renderer.createText(event.message);
    this.renderer.appendChild(error, message);
    this.renderer.appendChild(this.allNotificationsContainer.nativeElement, error);
    setTimeout(() => {
      this.renderer.removeChild(this.allNotificationsContainer.nativeElement, error);
    }, 10000);
  }

}
