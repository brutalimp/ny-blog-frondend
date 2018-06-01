
import {mergeMap} from 'rxjs/operators';
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
    return this.http.get<any>('/api/article/' + id).pipe(mergeMap<any, Article>((res) => {
      return this.getArticleFromRawData(res);
    }));
  }

  public create(article: Article) {
    return this.http.post<string>('/api/article', article);
  }

  public update(article: Article) {
    return this.http.put<string>('/api/article/' + article._id, article);
  }

  public delete(id: string) {
    return this.http.delete<string>('/api/article/' + id);
  }

  public getArticleFromRawData(res): Promise<Article> {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsText(new Blob([new Uint8Array(res.content.data)]), 'utf-8');
      filereader.onloadend = (event) => {
        let article: Article = res;
        article.content = event.target['result'];
        resolve(article);
      }
    });
  }

}
