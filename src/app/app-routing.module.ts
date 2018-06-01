import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { routeConst } from '../constants/route.constant';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthorizationService } from './services/authorization.service';

const appRouters: Routes = [
    { path: '', loadChildren: 'app/article-list/article-list.module#ArticleListModule' },
    { path: routeConst.ARTICLE, loadChildren: 'app/article/article.module#ArticleModule' },
    { path: routeConst.PROFILE, loadChildren: 'app/profile/profile.module#ProfileModule', canLoad: [AuthGuardService] },
    { path: routeConst.UPLOAD, loadChildren: 'app/upload/upload.module#UploadModule', canLoad: [AuthGuardService] },
    { path: routeConst.ONLINE, loadChildren: 'app/online/online.module#OnlineModule', canLoad: [AuthGuardService] },
    { path: routeConst.STATISTICS, loadChildren : 'app/statistics/statistics.module#StatisticsModule', canLoad: [AuthGuardService] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRouters)],
    exports: [RouterModule]
})
export class AppRoutingModule { }