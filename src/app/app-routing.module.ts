import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfiniteCalendarYearComponent} from './infinite-calendar/infinite-calendar-year/infinite-calendar-year.component';
import {InfiniteCalendarComponent} from './infinite-calendar/infinite-calendar.component';
import {InfiniteCalendarTestComponent} from './infinite-calendar/infinite-calendar-test/infinite-calendar-test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: InfiniteCalendarComponent
  },
  {
    path: 'test2',
    component: InfiniteCalendarTestComponent
  },
  {
    path: '',
    loadChildren: './index/index.module#IndexModule'
  },
  {
    path: '',
    loadChildren: './amap/amap.module#AmapModule'
  },
  {
    path: 'regional',
    loadChildren: './regional-performance/regional-performance.module#RegionalPerformanceModule'
  },
  {
    path: 'region',
    loadChildren: './regional/region.module#RegionModule'
  },
  {
    path: 'sales',
    loadChildren: './sales-rank/sales-rank.module#SalesRankModule'
  },
  {
    path: 'resale',
    loadChildren: './resale-advice/resale-advice.module#ResaleAdviceModule'
  },
  {
    path: 'trend',
    loadChildren: './trend/trend.module#TrendModule'
  },
  {
    path: 'suggest',
    loadChildren: './suggest/suggest.module#SuggestModule'
  },

  { path: 'user',
    loadChildren: './user/user.module#UserModule'
  },

  {
    path: ':orgCode/:shopId/:shopName/heatMap',
    loadChildren: './shop-heat-map/shop-heat-map.module#ShopHeatMapModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
