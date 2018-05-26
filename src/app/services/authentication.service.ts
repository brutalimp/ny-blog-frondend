import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseService } from './api-base.service';
import { Registeration } from '../responses/registeration';
import { User } from '../models/User';

@Injectable()
export class AuthenticationService {

  constructor(private http: ApiBaseService) { }


  public logIn(user: User) {
    return this.http.post<Registeration>('/api/auth/login', user);
  }

}
