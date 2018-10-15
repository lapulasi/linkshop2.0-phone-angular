import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopHeatMapComponent} from './shop-heat-map.component';
import {ShopHeatMapRoutingModule} from './shop-heat-map-routing.module';
import {HeatMapModule} from '../heat-map/heat-map.module';
import { ShopCompareHeatMapComponent } from './shop-compare-heat-map/shop-compare-heat-map.component';
import { ShopCompareListComponent } from './shop-compare-list/shop-compare-list.component';
// import {InfiniteCalendarModule} from 'ng-infinite-calendar';
import {MyDateRangePickerModule} from 'mydaterangepicker/dist/my-date-range-picker.module';
import { DateCompareHeatMapComponent } from './date-compare-heat-map/date-compare-heat-map.component';
import {OrgLevelService} from '../service/org-level.service';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {OrgService} from '../service/org.service';
import {OrgResolver} from '../resolve/org.resolver';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {InfiniteCalendarModule} from '../infinite-calendar/infinite-calendar.module';

@NgModule({
  imports: [
    CommonModule,
    HeatMapModule,
    ShopHeatMapRoutingModule,
    InfiniteCalendarModule,
    MyDateRangePickerModule,
    // InfiniteCalendarModule
    NgbModule,
    FormsModule
  ],
  providers: [OrgResolver,
    OrgService,
    OrgLevelListResolver,
    OrgLevelService],
  declarations: [ShopHeatMapComponent, ShopCompareHeatMapComponent, ShopCompareListComponent, DateCompareHeatMapComponent]
})
export class ShopHeatMapModule { }
