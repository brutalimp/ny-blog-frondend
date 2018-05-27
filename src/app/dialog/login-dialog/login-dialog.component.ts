import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthorizationService } from '../../services/authorization.service';
import { GlobalService } from '../../services/global.service';
import { BroadcasterService } from '../../services/broadcaster.service';
import { eventConstant } from '../../../constants/event.constant';
import { User } from '../../models/User';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  public user: User;

  constructor(private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private $broadcasterService: BroadcasterService,
    private globalService: GlobalService) { }

  public ngOnInit() {
    this.user = new User();
  }

  public logIn() {
    this.authenticationService.logIn(this.user).subscribe((res) => {
      this.authorizationService.setAuthorizationToken(res.token);
      this.globalService.logIn(this.user);
      this.$broadcasterService.broadcast(eventConstant.CLOSEDIALOG);
    });
  }
}
