import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { fromEvent as observableFromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as marked from 'marked';
import { ArticleService } from '../services/article.service';
import { AlertService } from '../services/alert.service';
import { Article } from '../models/Article';

enum PageMode {
  CREATE, EDIT
}

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit, AfterViewInit {
  @ViewChild('onlineForm') onlineForm: NgForm;
  public article: Article = new Article();
  public pageMode = PageMode.CREATE;
  public fullScreen = false;
  public parsedContent;

  constructor(private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getArticleIdFromRoute();
    this.getArticle();
  }

  ngAfterViewInit() {
    this.addTextareaEventHandler();
  }

  public getArticle() {
    if (this.article._id) {
      this.articleService.getById(this.article._id).subscribe((article: Article) => {
        this.article = article;
        this.pageMode = PageMode.EDIT;
        this.parsedContent = marked(this.article.content);
      });
    }
  }

  public getArticleIdFromRoute() {
    this.article._id = this.activatedRoute.snapshot.params['id'];
  }

  public addTextareaEventHandler() {
    const target = document.getElementById('content');
    const source = observableFromEvent(target, 'input');
    source.pipe(debounceTime(500)).subscribe(() => {
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
    if (this.pageMode === PageMode.CREATE) {
      this.articleService.create(this.article).subscribe((res) => {
        this.saveHandler();
      })
    } else {
      this.articleService.update(this.article).subscribe((res) => {
        this.saveHandler();
      })
    }
  }

  public saveHandler() {
    this.alertService.success('保存成功.');
    this.onlineForm.form.setErrors({ 'uploaded': true })
  }
}
