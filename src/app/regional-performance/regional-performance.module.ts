import {NgModule} from '@angular/core';
import {RegionalPerformanceRoutingModule} from './regional-performance-routing.module';
import {RegionalPerformanceComponent} from './component/regional-performance.component';
import {RegionalSearchComponent} from './component/regional-search.component';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {OrgLevelService} from '../service/org-level.service';
import {DateService} from '../service/date.service';
import {CommonModule} from '@angular/common';
import {WeekPipe} from '../common/week.pipe';
import {DateUtil} from '../common/date-util';
import {OrgService} from '../service/org.service';
import {OrgResolver} from '../resolve/org.resolver';
import {DataStatService} from '../service/data-stat.service';
import {Constant} from '../common/constant';
import {ShopService} from '../service/shop.service';
import {FormsModule} from '@angular/forms';
import {SortUtil} from '../common/sort-util';
import {RegionalGuestComponent} from './component/regional-guest.component';
import {RegionalEffectiveComponent} from './component/regional-effective.component';
import {RegionalSalesComponent} from './component/regional-sales.component';
import {ShopGuestService} from '../service/shop-guest.service';
import {RegionalOverviewComponent} from './component/regional-overview.component';
import {RegionalOverviewGuestComponent} from './component/regional-overview-guest.component';
import {RegionalOverviewSalesComponent} from './component/regional-overview-sales.component';
import {RegionalOverviewEffectiveComponent} from './component/regional-overview-effective.component';
import {DistrictService} from '../service/district.service';
import {RegionalPerformanceService} from "./regional-performance.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegionalPerformanceRoutingModule,
  ],
  declarations: [
    WeekPipe,
    RegionalPerformanceComponent,
    RegionalSearchComponent,
    RegionalGuestComponent,
    RegionalSalesComponent,
    RegionalEffectiveComponent,
    RegionalOverviewComponent,
    RegionalOverviewGuestComponent,
    RegionalOverviewSalesComponent,
    RegionalOverviewEffectiveComponent
  ],
  providers: [
    OrgLevelService,
    OrgResolver,
    OrgLevelListResolver,
    DateService,
    DateUtil,
    SortUtil,
    OrgService,
    ShopService,
    ShopGuestService,
    DataStatService,
    Constant,
    DistrictService,
    RegionalPerformanceService
  ]
})

export class RegionalPerformanceModule {

}
