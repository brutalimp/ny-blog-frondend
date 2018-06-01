import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router) { }

  public canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error('Please login first.');
      return false;
    }
    return true;
  }
}
