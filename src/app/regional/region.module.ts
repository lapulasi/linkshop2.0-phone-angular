import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegionRoutingModule} from './region-routing.module';
import { SalesComponent } from './sales/sales.component';
import { ShopComponent } from './shop/shop.component';
import {GuestComponent} from './guest/guest.component';
import { ConditionComponent } from './condition/condition.component';
import { SearchComponent } from './search/search.component';
import {GuestOverviewComponent} from './guest/guest-overview.component';
import {LevelListService} from './condition/level-list.service';
import {DateService} from '../service/date.service';
import {DateUtil} from '../common/date-util';
import {WeekPipe} from '../common/week.pipe';
import {ShopOverviewComponent} from './shop/shop-overview.component';
import {SalesOverviewComponent} from './sales/sales-overview.component';
import {RegionService} from './region.service';
import {SortUtil} from "../common/sort-util";
import { OverviewComponent } from './overview/overview.component';
import {WebBridge} from "../common/web-bridge";

@NgModule({
  imports: [
    CommonModule,
    RegionRoutingModule
  ],
  declarations: [
    WeekPipe,
    SalesComponent,
    ShopComponent,
    GuestComponent,
    GuestOverviewComponent,
    ConditionComponent,
    SearchComponent,
    GuestOverviewComponent,
    SalesOverviewComponent,
    ShopOverviewComponent,
    OverviewComponent
  ],
  providers: [
    LevelListService,
    RegionService,
    DateService,
    DateUtil,
    SortUtil,
    WebBridge
  ]
})

export class RegionModule {}
