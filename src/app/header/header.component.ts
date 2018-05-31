import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../services/broadcaster.service';
import { AppConfig } from '../services/app.config.service';
import { GlobalService } from '../services/global.service';
import { AuthorizationService } from '../services/authorization.service';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { eventConstant } from '../../constants/event.constant';
import { diaglogType } from '../../constants/diaglog.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private broadcasterService: BroadcasterService,
    public global: GlobalService,
    private userService: UserService,
    private authorizationService: AuthorizationService,
    public appConfig: AppConfig) { }

  public ngOnInit() { }

  public ngAfterContentInit() {
    this.init();
  }

  public init() {
    if (!this.authorizationService.getAuthorizationToken()) {
      this.broadcasterService.broadcast(eventConstant.ISLOGGEDIN);
      return;
    };
    this.userService.getMe().subscribe((res) => {
      this.global.user = res;
      this.global.loggedin = true;
      this.broadcasterService.broadcast(eventConstant.ISLOGGEDIN);
    }, (err) => {
      this.authorizationService.clearAuthorizationToken();
    })
  }

  public displayLoginDialog() {
    this.broadcasterService.broadcast(eventConstant.OPENDIALOG, diaglogType.lOGIN);
  }

  public displayRegisterDialog() {
    this.broadcasterService.broadcast(eventConstant.OPENDIALOG, diaglogType.REGISTERATION);
  }

  public edit(){
    this.broadcasterService.broadcast(eventConstant.EDITARTICLE);
  }

  public download() {
    this.broadcasterService.broadcast(eventConstant.DOWNLOAD);
  }

}
