import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {

    public config: configInterface = { 
        host: 'localhost',
        port: 80,
        https: false,
        enableRegister: true,
    };

    constructor(private http: HttpClient) { }

    public getConfig(key: string) {
        return this.config[key];
    }

    public load() {
        return new Promise((resolve, reject) => {
             this.http.get<configInterface>('assets/config.json').subscribe((res)=> {
                  this.config = res;
                  resolve(true);
             })
        })
    }
}

export interface configInterface {
    host: string;
    port: number;
    https: boolean;
    enableRegister: boolean;
} 