import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
    constructor(private logger: LoggerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const startTime = Date.now();
        let ok: string;

        return next.handle(req)
            .pipe(
                tap(event => {
                    ok = event instanceof HttpResponse ? 'succeed' : '';
                }, err => {
                    ok = 'failed';
                }),
                finalize(() => {
                    const elapsed = Date.now() - startTime;
                    const msg = `${req.method} "${req.urlWithParams}"
                       ${ok} in ${elapsed} ms.`;
                    this.logger.info(msg);
                }))
    }
}