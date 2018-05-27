import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { BroadcasterService } from '../services/broadcaster.service';
import { routeConst } from '../../constants/route.constant';
import { eventConstant } from '../../constants/event.constant';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public showDashboard = false;

  public menuItems = [{
    title: '主页',
    icon: 'fa-home',
    route: routeConst.HOME,
  }, {
    title: '简介',
    icon: 'fa-user',
    route: routeConst.PROFILE
  }, {
    title: '上传',
    icon: 'fa-upload',
    route: routeConst.UPLOAD
  }, {
    title: '统计',
    icon: 'fa-bar-chart',
    route: routeConst.STATISTICS
  }]

  constructor(private router: Router,
    private $broadcaserService: BroadcasterService,
    public global: GlobalService) { }

  ngOnInit() { }

  public displayDashboard() {
    this.showDashboard = !this.showDashboard;
    document.body.setAttribute('style', 'overflow: hidden');
  }

  public closeDashboard() {
    this.showDashboard = !this.showDashboard;
    document.body.setAttribute('style', null);
  }

  public navigate(route: string) {
    this.router.navigateByUrl(route);
    this.closeDashboard();
  }

  public gotoHome() {
    this.router.navigateByUrl('');
  }

  public logOut() {
    this.global.logOut();
    this.gotoHome();
    this.$broadcaserService.broadcast(eventConstant.LOGOUT);
    this.closeDashboard();
  }

}
