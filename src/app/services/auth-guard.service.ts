import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router) { }

  public canLoad() {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error('请先登陆.');
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
