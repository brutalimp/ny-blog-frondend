import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { BroadcasterService } from '../services/broadcaster.service';
import { eventConstant } from '../../constants/event.constant';
import { Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable()
export class GlobalService {
  public displayDialog: boolean;
  public loggedin: boolean;
  public user: User;
  public title: string;

  constructor(private authorizationService: AuthorizationService,
    private $broadcasterService: BroadcasterService) {
    this.displayDialog = false;
    this.loggedin = false;
    this.user = new User();
  }

  public logIn(user: User) {
    this.loggedin = true;
    this.user.name = user.name;
    this.user._id = user._id;
    this.$broadcasterService.broadcast(eventConstant.ISLOGGEDIN);
  }

  public logOut() {
    this.loggedin = false;
    this.authorizationService.clearAuthorizationToken();
  }

}
