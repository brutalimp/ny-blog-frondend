import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as marked from 'marked';
import { highlight, highlightAuto } from 'highlight.js';
import { GlobalService } from '../services/global.service';
import { BroadcasterService } from '../services/broadcaster.service';
import { eventConstant } from '../../constants/event.constant';
import { routeConst } from '../../constants/route.constant';
import { Article } from '../models/Article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  public article: Article = new Article();
  public parseredHtml: string = 'Loading...';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private globalService: GlobalService,
    private broadcasterService: BroadcasterService) { }

  ngOnInit() {
    this.addEventListener();
    this.getArticleIdFromRoute();
    this.getArticleById(this.article._id);
  }

  ngOnDestroy() {
    this.globalService.title ='';
  }

  public addEventListener() {
    this.broadcasterService.register(eventConstant.EDITARTICLE, () => {
      this.gotoEditArticle()
    })
  }

  public gotoEditArticle() {
    if (this.article._id) {
      this.router.navigateByUrl(`online/` + this.article._id);
    }
  }

  public getArticleIdFromRoute() {
    this.article._id = this.activatedRoute.snapshot.params['id'];
  }

  public getArticleById(id: string) {
    this.articleService.getById(id).subscribe((res) => {
      this.article = res;
      this.globalService.title = this.article.name;
      this.parseFile();
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
