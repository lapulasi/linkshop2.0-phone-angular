import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SalesSuggestComponent} from './sales-suggest.component';
import {StoreSuggestComponent} from './store-suggest/store-suggest.component';
import {CustomerSuggestComponent} from './customer-suggest/customer-suggest.component';
import {OrgLevelListResolver} from "../resolve/org-level-list.resolver";
import {OrgResolver} from "../resolve/org.resolver";

const routes: Routes = [
  {
    path: 'sales/:orgCode',
    component: SalesSuggestComponent,
    resolve: {
      org: OrgResolver,
      levelList: OrgLevelListResolver
    }
  },
  {
    path: 'store/:orgCode',
    component: StoreSuggestComponent,
    resolve: {
      org: OrgResolver,
      levelList: OrgLevelListResolver
    }
  },
  {
    path: 'customer/:orgCode',
    component: CustomerSuggestComponent,
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
export class SuggestRoutingModule {}
