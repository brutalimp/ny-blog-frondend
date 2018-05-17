import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { BroadcasterService } from '../services/broadcaster.service';
import { ArticleService } from '../services/article.service';
import { AlertService } from '../services/alert.service';
import { eventConstant } from '../../constants/event.constant';
import { Article } from '../models/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  public articleList: Article[] = [];

  constructor(public global: GlobalService,
    private router: Router,
    private $broadcasterService: BroadcasterService,
    private alertService: AlertService,
    private articleService: ArticleService) {

    this.getArticles();
  }

  public ngOnInit() {
    this.$broadcasterService.register(eventConstant.LOGOUT, () => {
      this.getAllPublicArticles();
    });
    this.$broadcasterService.register(eventConstant.ISLOGGEDIN, () => {
      this.getArticles();
    });
  }

  public getArticles() {
    if (this.global.loggedin) {
      this.getUserArticles();
    } else {
      this.getAllPublicArticles();
    }

  }

  public getUserArticles() {
    this.articleService.getAll().subscribe((articles) => {
      this.getArticleHandler(articles);
    });
  }

  public getAllPublicArticles() {
    this.articleService.getAllPublic().subscribe((articles) => {
      this.getArticleHandler(articles);
    });
  }

  public getArticleHandler(articles: Article[]) {
    if (articles.length > 0) {
      this.articleList.length = 0;
      for (let article of articles) {
        const temArticle = new Article();
        temArticle.owner = article.owner;
        temArticle._id = article._id;
        temArticle.name = article.name;
        temArticle.public = article.public
        this.articleList.push(temArticle);
      }
    }
  }

  public viewClick(id: string) {

    this.router.navigateByUrl('/article/' + id);
    // this.articleService.delete(id).subscribe((res)=> {
    //   console.log(res);
    // });
  }

  public deleteArticle(id: string) {
    this.articleService.delete(id).subscribe((res) => {

    }, (error) => {
      this.articleList = this.articleList.filter((article) => {
        return article._id !== id;
      });
      this.alertService.success(error.error.text);
    });
  }

}
