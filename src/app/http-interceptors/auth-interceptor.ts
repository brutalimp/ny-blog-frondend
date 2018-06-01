import { Injectable } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { BroadcasterService } from '../services/broadcaster.service';
import { GlobalService } from '../services/global.service';
import { eventConstant } from '../../constants/event.constant';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthorizationService,
        private authenService: AuthenticationService,
        private alertService: AlertService,
        private globalService: GlobalService,
        private broadcasterService: BroadcasterService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getAuthorizationToken();
        if (!authToken) return next.handle(req);
        if (!this.authenService.isAuthenticated()) {
            this.alertService.error('请重新登陆.');
            this.globalService.logOut();
            this.broadcasterService.broadcast(eventConstant.LOGOUT);
        }
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        return next.handle(authReq);
    }

}