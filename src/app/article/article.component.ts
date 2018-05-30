import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as marked from 'marked';
import { highlight, highlightAuto } from 'highlight.js';
import { GlobalService } from '../services/global.service';
import { Article } from '../models/Article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  public article: Article;
  public parseredHtml: string = 'Loading...';

  constructor(private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private globalService: GlobalService) {
    this.article = new Article();
  }

  ngOnInit() {
    this.getArticleId();
    this.getArticleById(this.article._id);
  }

  ngOnDestroy() {
    this.globalService.title.next('');
  }

  public getArticleId() {
    this.article._id = this.activatedRoute.snapshot.params['id'];
  }

  public getArticleById(id: string) {
    this.articleService.getById(id).subscribe((res: any) => {
      const filereader = new FileReader();
      this.article = res;
      this.globalService.title.next(this.article.name);
      filereader.readAsText(new Blob([new Uint8Array(res.content.data)]), 'utf-8');
      filereader.onloadend = (event) => {
        this.article.content = event.target['result'];
        this.parseFile();
      }
    })
  }

  public parseFile() {
    switch (this.article.type) {
      case 'md':
        this.parseredHtml = marked(this.article.content);
        break;
      case 'txt':
        this.parseredHtml = this.article.content;
        break;
      default:
        this.parseredHtml = marked(this.article.content);
    }
  }
}
