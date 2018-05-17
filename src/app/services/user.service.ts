
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { User } from '../models/User';
import { Registeration } from '../responses/registeration';
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
 
    public getAll() {
        return this.http.get<User[]>('http://localhost:3000/api/users');
    }
 
    public getById(id: number) {
        return this.http.get('http://localhost:3000/api/users' + id);
    }
 
    public getMe() {
        return this.http.get<User>('http://localhost:3000/api/auth/me')
    }

    public create(user: User) {
        return this.http.post<Registeration>('http://localhost:3000/api/auth/register', user);
    }
 
    public update(user: User) {
        return this.http.put('/api/users/' + user._id, user);
    }
 
    public delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}