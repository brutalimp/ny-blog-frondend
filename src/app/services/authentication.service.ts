import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from './authorization.service'
import { ApiBaseService } from './api-base.service';
import { Registeration } from '../responses/registeration';
import { User } from '../models/User';

@Injectable()
export class AuthenticationService {

  constructor(private http: ApiBaseService,
    private authorizationService: AuthorizationService,
    ) { }


  public logIn(user: User) {
    return this.http.post<Registeration>('/api/auth/login', user);
  }

  public isAuthenticated(): boolean {
     const jwtHelper = new JwtHelperService();
     const token = this.authorizationService.getAuthorizationToken();
     return !jwtHelper.isTokenExpired(token);
  }

}
