import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as marked from 'marked';
import { Observable } from 'rxjs/Rx';
import 'rxjs/observable/fromEvent';
import { ArticleService } from '../services/article.service';
import { AlertService } from '../services/alert.service';
import { Article } from '../models/Article';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit, AfterViewInit {

  public article: Article = new Article();
  public fullScreen = false;
  public parsedContent;

  constructor(private articleService: ArticleService,
    private alertService: AlertService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.addTextareaEventHandler();
  }

  public addTextareaEventHandler() {
    const target = document.getElementById('content');
    const source = Observable.fromEvent(target, 'input');
    source.debounceTime(500).subscribe(() => {
      this.parsedContent = marked(this.article.content);
    })
  }

  public togglefullScreen() {
    this.fullScreen = !this.fullScreen;
    if (this.fullScreen) {
      document.body.setAttribute('style', 'overflow: hidden');
    } else {
      document.body.setAttribute('style', null);
    }
  }

  public save() {
    this.article.filename = this.article.name;
    this.articleService.create(this.article).subscribe((res) => {
      this.alertService.success('上传成功。');
    })
  }
}
