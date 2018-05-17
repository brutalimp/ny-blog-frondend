import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as marked from 'marked';
import { highlight, highlightAuto } from 'highlight.js';
import { Article } from '../models/Article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public parseredHtml: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private articleService: ArticleService) {
    this.article = new Article();
  }

  ngOnInit() {
    this.getArticleId();
    this.getArticleById(this.article._id);
  }

  public getArticleId() {
    this.article._id = this.activatedRoute.snapshot.params['id'];
  }

  public getArticleById(id: string) {
    this.articleService.getById(id).subscribe((res: any) => {
      const filereader = new FileReader();
      filereader.readAsText(new Blob([new Uint8Array(res.content.data)]), 'utf-8');
      filereader.onloadend = (event) => {
        this.article.content = event.target['result'];
        this.parseFile();
      }
    })
  }

  public parseFile() {
    this.parseredHtml = marked(this.article.content);
  }
}
