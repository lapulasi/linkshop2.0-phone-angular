import {NgModule} from '@angular/core';
import {AmapRoutingModule} from './amap-routing.module';
import {AmapComponent} from './amap.component';
import {CommonModule, DatePipe} from '@angular/common';
import {NgxAmapModule} from 'ngx-amap';
import {LevelListService} from './level-list.service';
import {OrgService} from '../service/org.service';
import {BubbleService} from './bubble.service';
import {OrgResolver} from '../resolve/org.resolver';
import {OrgLevelListResolver} from '../resolve/org-level-list.resolver';
import {OrgLevelService} from "../service/org-level.service";
import {ShopService} from "../service/shop.service";
import {DistrictService} from "../service/district.service";
import {TitleResolver} from "../resolve/title.resolver";
import {WeatherService} from "../service/weather.service";
import {SortUtil} from "../common/sort-util";
import {TokenResolver} from "../resolve/token.resolver";
import {AuditLogService} from "../service/audit-log.service";
import { SearchShopComponent } from './search-shop/search-shop.component';
import {RegionService} from "../regional/region.service";
import {DeviceService} from "../service/device-service";

@NgModule({
  imports: [
    NgxAmapModule.forRoot({apiKey: '5030d7d895261335864db46a23d88cb5', apiVersion: '1.4.6'}),
    CommonModule,
    AmapRoutingModule
  ],
  declarations: [
    AmapComponent,
    SearchShopComponent
  ],
  providers: [
    DatePipe,
    LevelListService,
    BubbleService,
    OrgService,
    ShopService,
    OrgResolver,
    OrgLevelService,
    OrgLevelListResolver,
    DistrictService,
    WeatherService,
    TitleResolver,
    SortUtil,
    TokenResolver,
    AuditLogService,
    RegionService,
    DeviceService
  ]
})

export class AmapModule {}
