import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { ViewHistory } from '../models/History';

@Injectable()
export class HistoryService {

  constructor(private http: ApiBaseService) { }

  public getHistorys() {
    return this.http.get<ViewHistory[]>('/api/history');
  }

  public delete(id: string) {
    return this.http.delete<string>('/api/article/' + id);
  }
}
