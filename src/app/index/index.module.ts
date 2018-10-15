import {NgModule} from '@angular/core';

import {IndexRoutingModule} from './index-routing.module';
import {OrgLevelService} from '../service/org-level.service';
import {OrgService} from '../service/org.service';
import {OrgResolver} from '../resolve/org.resolver';
import {CommonModule} from '@angular/common';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {DataStatService} from '../service/data-stat.service';
import {ShopService} from '../service/shop.service';
import {ShopGuestService} from '../service/shop-guest.service';
import {ShopSalesService} from '../service/shop-sales.service';
import {DateUtil} from '../common/date-util';
import {TestComponent} from './test.component';
import {SalesReportComponent} from './sales-report/sales-report.component';
import {FormsModule } from '@angular/forms';
import {BriefReportComponent} from '../brief-report/brief-report.component';
import {BriefReportEcharts} from '../brief-report/brief-report-echarts';
import {NgxEchartsModule} from 'ngx-echarts';
import {TrendService} from '../service/trend-service';
import {WeatherService} from '../service/weather.service';
import {IndexAdviceComponent} from './component/index-advice.component';


@NgModule({
  imports: [
    IndexRoutingModule,
    CommonModule,
    FormsModule,
    NgxEchartsModule
  ],
  declarations: [
    IndexAdviceComponent,
    SalesReportComponent,
    TestComponent,
    BriefReportComponent
  ],
  providers: [
    OrgService,
    ShopService,
    OrgLevelService,
    DataStatService,
    OrgResolver,
    OrgLevelListResolver,
    DateUtil,
    ShopGuestService,
    ShopSalesService,
    BriefReportEcharts,
    TrendService,
    WeatherService
  ]
})
export class IndexModule {
}
