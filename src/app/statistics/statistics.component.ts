import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Chart, ChartData, ChartConfiguration } from 'chart.js'
import { HistoryService } from '../services/history.service';
import { ViewHistory } from '../models/History';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public chartConfig: ChartConfiguration = {};
  public historys: ViewHistory[] = [];
  public loading = true;

  constructor(private hitstoryService: HistoryService) { }

  ngOnInit() {
    this.getHistorys();
  }

  public initChart() {
    this.chartConfig = {};
    this.chartConfig.type = 'line';
    this.chartConfig.options = {
      legend: {
        display: false
      },
      responsive: true,
      title: {
        display: true,
        text: '访问历史记录'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: '日期'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: '访问数'
          },
          ticks: {
            beginAtZero: true,
            callback: (label, index, labels) => {
              if (Math.floor(label) === label) {
                return label;
              }
            }
          }
        }]
      }
    }
    this.chartConfig.data = {};
    this.chartConfig.data.labels = [];
    this.chartConfig.data.datasets = []
    this.chartConfig.data.datasets[0] = {};
    this.chartConfig.data.datasets[0].data = [];
    this.chartConfig.data.datasets[0].backgroundColor = 'rgb(54, 162, 235)';
    this.chartConfig.data.datasets[0].borderColor = 'rgb(54, 162, 235)';
    this.chartConfig.data.datasets[0].label = '次数';
    this.chartConfig.data.datasets[0].fill = false;
    for (let i = 0; i <= 29; i++) {
      this.chartConfig.data.datasets[0].data[i] = 0;
    }
  }

  public configChart(historys: ViewHistory[]) {
    const labels = [];
    const now = Date.now();
    for (let i = 0; i <= 29; i++) {
      const temTime = now - 1000 * 60 * 60 * 24 * i;
      const label = moment(temTime).format('MMMM DD');
      labels.unshift(label);
    }
    this.chartConfig.data.labels = labels;

    for (let history of historys) {
      for (let i = 0; i <= labels.length; i++) {
        if (moment(history.timestamp).format('MMMM DD') == labels[i]) {
          (this.chartConfig.data.datasets[0].data[i] as number)++;
        }
      }
    }
    this.renderChart();
  }

  public renderChart() {
    const ctx = (document.getElementById('chart') as HTMLCanvasElement).getContext('2d');
    this.loading = false;
    new Chart(ctx, this.chartConfig);
  }

  public getHistorys() {
    this.hitstoryService.getHistorys<ViewHistory[]>().subscribe((res) => {
      this.historys = res;
      this.initChart();
      this.configChart(res);
    })
  }

}
