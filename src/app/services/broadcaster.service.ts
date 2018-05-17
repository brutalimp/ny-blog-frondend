import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { } from '';

@Injectable()
export class BroadcasterService {

  private eventCollection: {[key: string]: EventEmitter<any>} = {};

  constructor() { }

  public broadcast(eventName: string, data?: any) {

    if(!this.eventCollection[eventName]) {
      this.eventCollection[eventName] = new EventEmitter();
    } 
    this.eventCollection[eventName].emit(data);
  }
  
  public register(eventName, callback: (data?: any) => void) {
    if(!this.eventCollection[eventName]) {
      this.eventCollection[eventName] = new EventEmitter();
    } 

    this.eventCollection[eventName].subscribe(callback);
  }
}
