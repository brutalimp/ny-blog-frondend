import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import { ViewHistory } from '../models/History';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public historys: ViewHistory[] = [];

  constructor(private hitstoryService: HistoryService) { }

  ngOnInit() {
    this.getHistorys();
  }

  public getHistorys() {
     this.hitstoryService.getHistorys().subscribe((res)=> {
       this.historys = res;
     })
  }

}
