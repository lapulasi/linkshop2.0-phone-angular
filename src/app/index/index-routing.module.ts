import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrgResolver} from '../resolve/org.resolver';
import {SalesReportComponent} from './sales-report/sales-report.component';
import {TestComponent} from './test.component';
import {BriefReportComponent} from '../brief-report/brief-report.component';
import {IndexAdviceComponent} from "./component/index-advice.component";


const routes: Routes = [

  {
    path: 'advice/:orgCode/:adcode',
    component: IndexAdviceComponent,
    resolve: {
      org: OrgResolver
    }
  },
  {
    path: 'salesReport',
    component: SalesReportComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'brief/:orgCode',
    component: BriefReportComponent,
    resolve: {
      org: OrgResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
