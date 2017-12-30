import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { CurrentUserService } from '../../current-user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {

  public userName: string;
  public coins: number;

  constructor(private router: Router,
    private currentUserService: CurrentUserService,
    private zone: NgZone) { }

  forceUpdate() {
    this.zone.run(() => { });
  }

  ngOnInit() {
    const user = this.currentUserService.getUser();
    this.userName = user.user.user_name;
    this.coins = user.user.coins;

    this.currentUserService.getCurrentUser().subscribe(curUser => {
      this.userName = curUser.user.user_name;
      this.coins = curUser.user.coins;
      this.forceUpdate();
    });
  }

  logout() {
    this.currentUserService.logout();
    this.router.navigate(['/']);
  }

}
