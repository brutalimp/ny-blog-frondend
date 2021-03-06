import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { BroadcasterService } from '../services/broadcaster.service';
import { ArticleService } from '../services/article.service';
import { AlertService } from '../services/alert.service';
import { eventConstant } from '../../constants/event.constant';
import { routeConst } from '../../constants/route.constant';
import { Article } from '../models/Article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  public articleList: Article[] = [];
  public loading = true;

  constructor(public global: GlobalService,
    private router: Router,
    private $broadcasterService: BroadcasterService,
    private alertService: AlertService,
    private articleService: ArticleService) { }

  public ngOnInit() {
    this.getArticles();
    this.$broadcasterService.register(eventConstant.LOGOUT, () => {
      this.getArticles();
    });
    this.$broadcasterService.register(eventConstant.LOGGEDIN, () => {
      this.getArticles();
    });
  }

  public getArticles() {
    this.articleService.getArticles().subscribe((articles) => {
      this.getArticleHandler(articles);
    });
  }
  public getArticleHandler(articles: Article[]) {
    this.articleList.length = 0;
    this.loading = false;
    if (articles.length > 0) {
      for (let article of articles) {
        const temArticle = new Article();
        temArticle.owner = article.owner;
        temArticle._id = article._id;
        temArticle.name = article.name;
        temArticle.public = article.public
        this.articleList.unshift(temArticle);
      }
    }
  }

  public viewClick(id: string) {
    this.router.navigateByUrl(`article/` + id);
  }

  public deleteArticle(id: string) {
    this.articleService.delete(id).subscribe((res) => {
      this.articleList = this.articleList.filter((article) => {
        return article._id !== id;
      });
      this.alertService.success('删除成功');
    });
  }

  public togglePerm(art: Article) {
    this.articleService.updatePerm(art._id, !art.public).subscribe(() => {
      this.articleList.forEach((article) => {
        if (art._id === article._id) {
          article.public = !article.public;
        }
      })
    })
  }
}
