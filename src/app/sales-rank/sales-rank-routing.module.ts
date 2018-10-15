import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SalesRankComponent} from './sales-rank.component';
import {OrgResolver} from '../resolve/org.resolver';

const routes: Routes = [

  {
    path: 'rank/:orgCode/:adcode',
    component: SalesRankComponent,
    resolve: {
      org: OrgResolver,
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRankRoutingModule {}
