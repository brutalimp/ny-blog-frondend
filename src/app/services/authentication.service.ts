import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registeration } from '../responses/registeration';
import { User } from '../models/User';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  public logIn(user: User) {
    return this.http.post<Registeration>('http://localhost:3000/api/auth/login', user);
  }

}
