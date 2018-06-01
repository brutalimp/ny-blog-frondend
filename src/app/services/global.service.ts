import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class GlobalService {
  public displayDialog: boolean;
  public loggedin: boolean;
  public user: User;
  public title: string;

  constructor(private authorizationService: AuthorizationService,
    private router: Router) {
    this.displayDialog = false;
    this.loggedin = false;
    this.user = new User();
  }

  public logIn(user: User) {
    this.loggedin = true;
    this.user.name = user.name;
    this.user._id = user._id;
  }

  public logOut() {
    this.loggedin = false;
    this.user = new User();
    this.title = '';
    this.router.navigateByUrl('');
    this.authorizationService.clearAuthorizationToken();
  }

}
