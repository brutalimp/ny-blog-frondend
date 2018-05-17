import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { User } from '../models/User';

@Injectable()
export class GlobalService {
  public displayDialog: boolean;
  public loggedin: boolean;
  public user: User;

  constructor(private authorizationService: AuthorizationService ) {
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
    this.authorizationService.clearAuthorizationToken();
  }

}
