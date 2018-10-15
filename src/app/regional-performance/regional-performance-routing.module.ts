import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegionalPerformanceComponent} from './component/regional-performance.component';
import {RegionalSearchComponent} from './component/regional-search.component';
import {RegionalOverviewComponent} from './component/regional-overview.component';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {OrgResolver} from '../resolve/org.resolver';

const routes: Routes = [

  {
    path: 'performance/:vdoing/:orgCode/:adcode',
    component: RegionalPerformanceComponent,
    resolve: {
      org: OrgResolver,
      levelList: OrgLevelListResolver
    }
  },
  {
    path: 'search',
    component: RegionalSearchComponent
  },
  {
    path: 'overview/:vdoing/:orgCode/:adcode',
    component: RegionalOverviewComponent,
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
export class RegionalPerformanceRoutingModule {}
