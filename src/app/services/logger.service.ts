import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  public info(message: string) {
    console.info(message);
  }

  public warn(message: string) {
    console.warn(message);
  }

  public error(message: string) {
    console.error(message);
  }

}
