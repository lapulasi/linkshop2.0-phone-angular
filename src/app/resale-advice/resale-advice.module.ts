import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResaleAdviceComponent} from './resale-advice.component';
import {ResaleAdviceRoutingModule} from './resale-advice-routing.module';
import {NgxEchartsModule} from 'ngx-echarts';
import {ResaleAdviceEcharts} from './resale-advice.echarts';
import {OrgResolver} from '../resolve/org.resolver';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {OrgService} from '../service/org.service';
import {OrgLevelService} from '../service/org-level.service';
import {DateService} from '../service/date.service';
import {DateUtil} from '../common/date-util';
import {Constant} from '../common/constant';
import {ShopService} from '../service/shop.service';
import {ShopGuestService} from '../service/shop-guest.service';
import {ShopSalesService} from '../service/shop-sales.service';
import {SortUtil} from '../common/sort-util';

@NgModule({
  imports: [
    CommonModule,
    ResaleAdviceRoutingModule,
    NgxEchartsModule,
  ],
  declarations: [
    ResaleAdviceComponent
  ],
  providers: [
    ResaleAdviceEcharts,
    OrgService,
    OrgLevelService,
    OrgResolver,
    OrgLevelListResolver,
    ShopGuestService,
    ShopSalesService,
    ShopService,
    DateService,
    DateUtil,
    Constant,
    SortUtil
  ]
})

export class ResaleAdviceModule {

}
