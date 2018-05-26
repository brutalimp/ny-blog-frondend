import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppConfig {

    private config: any;

    constructor(private http: HttpClient) { }

    public getConfig(key: string) {
        return this.config[key];
    }

    public load() {
        return new Promise((resolve, reject) => {
             this.http.get('assets/config.json').subscribe((res)=> {
                  this.config = res;
             })
        })
    }
}