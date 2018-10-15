
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrendRoutingModule} from './trend-routing.module';
import {SalesTrendComponent} from './sales-trend.component';
import {StoreTrendComponent} from './store-trend/store-trend.component';
import {CustomerTrendComponent} from './customer-trend/customer-trend.component';
import {SalesTrendsEcharts} from './trends/sales-trends-echarts';
import {StoreTrendsEcharts} from './trends/store-trends-echarts';
import {CustomerTrendsEcharts} from './trends/customer-trends-echarts';
import {NgxEchartsModule} from 'ngx-echarts';
import {DateUtil} from '../common/date-util';
import {TrendService} from '../service/trend-service';
import {OrgResolver} from '../resolve/org.resolver';
import {OrgService} from '../service/org.service';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {OrgLevelService} from '../service/org-level.service';
import {AuditLogService} from "../service/audit-log.service";
import {Globals} from "../global";

@NgModule({
  imports: [
    CommonModule,
    TrendRoutingModule,
    NgxEchartsModule,
  ],
  declarations: [
    SalesTrendComponent,
    StoreTrendComponent,
    CustomerTrendComponent,
  ],
  providers: [
    SalesTrendsEcharts,
    StoreTrendsEcharts,
    CustomerTrendsEcharts,
    DateUtil,
    TrendService,
    OrgResolver,
    OrgService,
    OrgLevelListResolver,
    OrgLevelService,
    AuditLogService,
    Globals
  ]
})

export class TrendModule {

}

