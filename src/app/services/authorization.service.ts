import { Injectable } from '@angular/core';
import { TOKEN } from '../../constants/global.constant';

@Injectable()
export class AuthorizationService {

  constructor() { }

  public getAuthorizationToken() {
    return localStorage.getItem(TOKEN);
  }

  public setAuthorizationToken(token: string) {
     localStorage.setItem(TOKEN, token);
  }

  public clearAuthorizationToken() {
     localStorage.removeItem(TOKEN);
  }

}
