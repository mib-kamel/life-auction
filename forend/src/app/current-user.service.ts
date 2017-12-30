import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CurrentUserService {

  private currentUser;
  private currentUserSubject = new Subject<any>();

  constructor(private http: Http) { }

  setCurrentUser(user) {
    this.currentUserSubject.next(user);
    this.currentUser = user;
    document.cookie = `username=${user.user.user_name}; path=/;`;
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  getUser() {
    return this.currentUser;
  }

  enter(name) {
    return this.http.get(`/api/enter/${name}`).map(res => res.json());
  }

  logout() {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  isLoggedIn() {
    return this.currentUser ? true : false;
  }

}
