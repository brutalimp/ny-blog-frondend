import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListRoutingModule } from './article-list-routing.module';

import { ArticleListComponent } from './article-list.component';

@NgModule({
  imports: [
    CommonModule,
    ArticleListRoutingModule
  ],
  declarations: [ ArticleListComponent ]
})
export class ArticleListModule { }
