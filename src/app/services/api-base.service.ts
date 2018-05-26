import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppConfig, configInterface } from './app.config.service';

@Injectable()
export class ApiBaseService {

  constructor(private http: HttpClient,
    private appConfig: AppConfig) { }

  public get<T>(action: string) {
    const url = this.concatUrl(action);
    return this.http.get<T>(url)
  }

  public post<T>(action: string, data: any) {
    const url = this.concatUrl(action);
    return this.http.post<T>(url, data);
  }

  public put<T>(action: string, data: any) {
    const url = this.concatUrl(action);
    return this.http.put<T>(url, data);
  }

  public delete<T>(action: string) {
    const url = this.concatUrl(action);
    return this.http.delete<T>(url);
  }

  public concatUrl(action: string) {
    const protocol = this.appConfig.config.https ? 'https' : 'http';
    return `${protocol}://${this.appConfig.config.host}:${this.appConfig.config.port}/${action}`;
  }
}
