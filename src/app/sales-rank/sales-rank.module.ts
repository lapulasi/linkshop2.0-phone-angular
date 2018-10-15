import {NgModule} from '@angular/core';
import {SalesRankComponent} from './sales-rank.component';
import {SalesRankRoutingModule} from './sales-rank-routing.module';
import {ShopGuestService} from '../service/shop-guest.service';
import {ShopSalesService} from '../service/shop-sales.service';
import {DateUtil} from '../common/date-util';
import {CommonModule} from '@angular/common';
import {ShopService} from '../service/shop.service';
import {SortUtil} from '../common/sort-util';
import {OrderBy} from '../common/order-by.pipe';
import {DataStatService} from '../service/data-stat.service';
import {OrgResolver} from '../resolve/org.resolver';
import {OrgService} from '../service/org.service';
import {AuditLogService} from "../service/audit-log.service";

@NgModule({
  imports: [
    CommonModule,
    SalesRankRoutingModule
  ],
  declarations: [
    SalesRankComponent,
    OrderBy
  ],
  providers: [
    DateUtil,
    SortUtil,
    ShopService,
    ShopGuestService,
    ShopSalesService,
    DataStatService,
    OrgService,
    OrgResolver,
    AuditLogService
  ]
})

export class SalesRankModule {

}
