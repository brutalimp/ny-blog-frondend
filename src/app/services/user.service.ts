
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ApiBaseService } from './api-base.service';
import { AuthorizationService } from '../services/authorization.service';
import { User } from '../models/User';
import { Registeration } from '../responses/registeration';

@Injectable()
export class UserService {
    constructor(private http: ApiBaseService,
        private authService: AuthorizationService) { }

    public getAll() {
        return this.http.get<User[]>('/api/users');
    }

    public getById(id: number) {
        return this.http.get('/api/users' + id);
    }

    public getMe() {
        return this.http.get<User>('/api/auth/me')
    }

    public create(user: User) {
        return this.http.post<Registeration>('/api/auth/register', user).pipe(map((res) => {
            this.authService.setAuthorizationToken(res.token);
            return res;
        }));
    }

    public update(user: User) {
        return this.http.put('/api/users/' + user._id, user);
    }

    public delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}