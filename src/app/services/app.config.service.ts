import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {

    public config: configInterface = { 
        host: 'localhost',
        port: 3000,
        https: false,
        acceptFileType: ".md",
        enableRegister: true,
    };

    constructor(private http: HttpClient) { }

    public getConfig(key: string) {
        return this.config[key];
    }

    public load() {
        return new Promise((resolve, reject) => {
             this.http.get<configInterface>('assets/config.json').subscribe((res)=> {
                  if(res.host.length>0) {
                      this.config.host = res.host;
                  }
                  if(res.port) {
                      this.config.port = res.port;
                  }
                  this.config.enableRegister = res.enableRegister;
                  this.config.https = res.https;
                  this.config.acceptFileType = res.acceptFileType;
                  resolve(true);
             })
        })
    }
}

export interface configInterface {
    host: string;
    port: number;
    https: boolean;
    acceptFileType: string;
    enableRegister: boolean;
} 