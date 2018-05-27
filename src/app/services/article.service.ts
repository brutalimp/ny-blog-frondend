import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiBaseService } from './api-base.service'
import { Article } from '../models/Article';

@Injectable()
export class ArticleService {
  constructor(private http: ApiBaseService) { }

  public getAllPublic() {
    return this.http.get<Article[]>('/api/public/article');
  }

  public getArticles() {
    return this.http.get<Article[]>('/api/article');
  }

  public getById(id: string) {
    return this.http.get<Article>('/api/article/' + id);
  }

  public create(article: Article) {
    return this.http.post('/api/article', article);
  }

  public update(article: Article) {
    return this.http.put('/api/article/' + article._id, article);
  }

  public delete(id: string) {
    return this.http.delete<string>('/api/article/' + id);
  }

}
