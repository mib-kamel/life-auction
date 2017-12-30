import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';

declare var io;

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html'
})
export class EnterComponent implements OnInit {

  public name = '';

  constructor(private router: Router, private currentUserService: CurrentUserService) { }

  ngOnInit() {
    const cookie = document.cookie;
    if (cookie && cookie.split('=')[0] === 'username') {
      this.name = cookie.split('=')[1];
      this.login(this.name);
    }
  }

  enterApp(e) {
    e.preventDefault();
    this.login(this.name);
  }

  login(username) {
    this.currentUserService.enter(this.name)
      .subscribe(res => {
        if (res.user) {
          this.currentUserService.setCurrentUser(res);
          this.router.navigate(['/', 'user']);
        }
      });
  }
}
