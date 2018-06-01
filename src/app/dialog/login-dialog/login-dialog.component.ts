import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('loginForm') loginForm: NgForm;
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
      this.globalService.logIn(this.user);
      this.$broadcasterService.broadcast(eventConstant.CLOSEDIALOG);
    }, (err) => {
      if (err.status === 404) {
        this.loginForm.controls['name'].setErrors({ 'incorrect': true });
      } else if (err.status === 401) {
        this.loginForm.controls['password'].setErrors({ 'incorrect': true });
      }
    });
  }
}
