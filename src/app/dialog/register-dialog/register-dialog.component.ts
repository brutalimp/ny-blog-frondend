import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { GlobalService } from '../../services/global.service';
import { BroadcasterService } from '../../services/broadcaster.service';
import { AuthorizationService } from '../../services/authorization.service';
import { eventConstant } from '../../../constants/event.constant';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  public submitted: boolean;
  public user: User;
  public passwordVerify;

  constructor(private userService: UserService,
    private globalService: GlobalService,
    private $broadcaster: BroadcasterService,
    private authorizationService: AuthorizationService) {
    this.submitted = false;
    this.user = new User();
    this.passwordVerify = '';
  }

  ngOnInit() { }

  public register() {
    this.userService.create(this.user).subscribe((res) => {
      if (res) {
        this.authorizationService.setAuthorizationToken(res.token)
        this.globalService.logIn(this.user);
        this.$broadcaster.broadcast(eventConstant.CLOSEDIALOG)
      }
    })
  }
}
