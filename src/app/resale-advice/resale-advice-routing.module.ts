import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResaleAdviceComponent} from './resale-advice.component';
import {OrgResolver} from '../resolve/org.resolver';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';

const routes: Routes = [

  {
    path: 'advice/:orgCode/:adcode',
    component: ResaleAdviceComponent,
    resolve: {
      org: OrgResolver,
      levelList: OrgLevelListResolver
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResaleAdviceRoutingModule {}
