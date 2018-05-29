import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    constructor(private alertService: AlertService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
            }, (err) => {
                this.alertService.error(err.error);
            }));
    }

}