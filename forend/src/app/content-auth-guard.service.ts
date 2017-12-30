import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class ContentAuthGuard implements CanActivate {
    constructor(private router: Router, private currentUserService: CurrentUserService) { }
    canActivate() {
        if (this.currentUserService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
