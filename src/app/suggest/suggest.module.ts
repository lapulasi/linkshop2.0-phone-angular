import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuggestRoutingModule} from './suggest-routing.module';
import {SalesSuggestComponent} from './sales-suggest.component';
import {StoreSuggestComponent} from './store-suggest/store-suggest.component';
import {CustomerSuggestComponent} from './customer-suggest/customer-suggest.component';
import {CustomerSuggestEcharts} from './trends/customer-suggest-echarts';
import {StoreSuggestEcharts} from './trends/store-suggest-echarts';
import {SalesSuggestEcharts} from './trends/sales-suggest-echarts';
import {NgxEchartsModule} from 'ngx-echarts';
import {OrgResolver} from "../resolve/org.resolver";
import {OrgService} from "../service/org.service";
import {OrgLevelListResolver} from "../resolve/org-level-list.resolver";
import {OrgLevelService} from "../service/org-level.service";

@NgModule({
  imports: [
    CommonModule,
    SuggestRoutingModule,
    NgxEchartsModule,
  ],
  declarations: [
    SalesSuggestComponent,
    StoreSuggestComponent,
    CustomerSuggestComponent,
  ],
  providers: [
    SalesSuggestEcharts,
    StoreSuggestEcharts,
    CustomerSuggestEcharts,
    OrgResolver,
    OrgService,
    OrgLevelListResolver,
    OrgLevelService
  ]
})

export class SuggestModule {

}
