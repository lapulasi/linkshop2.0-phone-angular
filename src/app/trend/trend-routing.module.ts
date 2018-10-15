
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SalesTrendComponent} from './sales-trend.component';
import {CustomerTrendComponent} from './customer-trend/customer-trend.component';
import {StoreTrendComponent} from './store-trend/store-trend.component';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {OrgResolver} from '../resolve/org.resolver';

const routes: Routes = [

  {
    path: 'salesTrend/:orgCode',
    component: SalesTrendComponent,
    resolve: {
      org: OrgResolver,
      levelList: OrgLevelListResolver
    }
  },
  {
    path: 'customerTrend/:orgCode',
    component: CustomerTrendComponent,
    resolve: {
      org: OrgResolver,
      levelList: OrgLevelListResolver
    }
  },
  {
    path: 'shopTrend/:orgCode',
    component: StoreTrendComponent,
    resolve: {
      org: OrgResolver,
      levelList: OrgLevelListResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendRoutingModule {}

