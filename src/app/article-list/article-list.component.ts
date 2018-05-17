import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { ArticleService } from '../services/article.service';
import { AlertService } from '../services/alert.service';
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
    private alertService: AlertService,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.getAllArticles();
  }

  public getAllArticles() {
    this.articleService.getAll(this.global.user).subscribe((articles) => {
      if (articles.length > 0) {
        for (let article of articles) {
          const temArticle = new Article();
          temArticle._id = article._id;
          temArticle.name = article.name;
          temArticle.public = article.public
          this.articleList.push(temArticle);
        }
      }
    })
  }

  public viewClick(id: string) {

    this.router.navigateByUrl('/article/'+ id);

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
