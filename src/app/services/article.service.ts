import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/Article';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) { }

  public getAllPublic() {
    return this.http.get<Article[]>('http://localhost:3000/api/public/article');
  }

  public getAll() {
    return this.http.get<Article[]>('http://localhost:3000/api/article');
  }

  public getById(id: string) {
    return this.http.get<Article>('http://localhost:3000/api/article/' + id);
  }

  public create(article: Article) {
    return this.http.post('http://localhost:3000/api/article', article);
  }

  public update(article: Article) {
    return this.http.put('http://localhost:3000/api/article/' + article._id, article);
  }

  public delete(id: string) {
    return this.http.delete<string>('http://localhost:3000/api/article/' + id);
  }

}
