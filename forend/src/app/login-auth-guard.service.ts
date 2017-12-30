import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class LoginAuthGuard implements CanActivate {
    constructor(private router: Router, private currentUserService: CurrentUserService) { }
    canActivate() {
        if (!this.currentUserService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/user']);
            return false;
        }
    }
}
