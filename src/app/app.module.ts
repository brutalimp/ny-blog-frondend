import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import { DialogComponent } from './dialog/dialog.component';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog.component';
import { ContentDirective } from './dialog/content.directive';
import { PasswordVerifyDirective } from './directives/password-verify.directive';
import { AlertComponent } from './alert/alert.component';
import { MenuComponent } from './menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    AlertComponent,
    DialogComponent,
    ContentDirective,
    LoginDialogComponent,
    RegisterDialogComponent,
    PasswordVerifyDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    SharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
