import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRouters } from './app-routers';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import { UploadComponent } from './upload/upload.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DialogComponent } from './dialog/dialog.component';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog.component';
import { ContentHostComponent } from './dialog/content-host/content-host.component';
import { ContentDirective } from './dialog/content.directive';

import { AppConfig } from './services/app.config.service';
import { BroadcasterService } from './services/broadcaster.service';
import { GlobalService } from './services/global.service';
import { PasswordVerifyDirective } from './directives/password-verify.directive';

import { ApiBaseService } from './services/api-base.service';
import { AuthorizationService } from './services/authorization.service';
import { AuthenticationService } from './services/authentication.service';
import { LoggerService } from './services/logger.service';
import { AlertService } from './services/alert.service';

import { httpInterceptorProviders } from './http-interceptors/index';

import { UserService } from './services/user.service';
import { ArticleService } from './services/article.service';
import { AlertComponent } from './alert/alert.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { GitComponent } from './git/git.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ArticleListComponent,
    ArticleComponent,
    LoginDialogComponent,
    UploadComponent,
    StatisticsComponent,
    DialogComponent,
    RegisterDialogComponent,
    ContentHostComponent,
    ContentDirective,
    PasswordVerifyDirective,
    AlertComponent,
    ProfileComponent,
    MenuComponent,
    GitComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouters)
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent],
  providers: [ ApiBaseService, BroadcasterService, GlobalService, UserService, ArticleService, AuthorizationService, AlertService,
    AuthenticationService, LoggerService, httpInterceptorProviders, AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
