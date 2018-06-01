import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppConfig } from './app.config.service';
import { BroadcasterService } from './broadcaster.service';
import { GlobalService } from './global.service';
import { ApiBaseService } from './api-base.service';
import { AuthorizationService } from './authorization.service';
import { AuthenticationService } from './authentication.service';
import { LoggerService } from './logger.service';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { ArticleService } from './article.service';
import { HistoryService } from './history.service';

import { httpInterceptorProviders } from '../http-interceptors/index';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [ApiBaseService, BroadcasterService, GlobalService, UserService, ArticleService, HistoryService, AuthorizationService,
    AlertService, AuthenticationService, LoggerService, httpInterceptorProviders, AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }],
})
export class ServicesModule { }
