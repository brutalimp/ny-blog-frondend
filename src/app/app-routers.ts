import { Routes } from '@angular/router';
import { routeConst } from '../constants/route.constant';

import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { UploadComponent } from './upload/upload.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProfileComponent } from './profile/profile.component';

export const appRouters: Routes = [
    { path: '', component: ArticleListComponent },
    { path: routeConst.ARTICLELIST, component: ArticleListComponent },
    { path: routeConst.ARTICLE, component: ArticleComponent },
    { path: routeConst.PROFILE, component: ProfileComponent },
    { path: routeConst.UPLOAD, component: UploadComponent },
    { path: routeConst.STATISTICS, component: StatisticsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }

]