import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopHeatMapComponent} from './shop-heat-map.component';
import {ShopCompareListComponent} from './shop-compare-list/shop-compare-list.component';
import {ShopCompareHeatMapComponent} from './shop-compare-heat-map/shop-compare-heat-map.component';
import {DateCompareHeatMapComponent} from './date-compare-heat-map/date-compare-heat-map.component';


const routes: Routes = [

  {
    path: '',
    component: ShopHeatMapComponent
  },
  {
    path: 'shopList',
    component: ShopCompareListComponent
  },
  {
    path: 'compare/:comparedShopId',
    component: ShopCompareHeatMapComponent
  },
  {
    path: 'date',
    component: DateCompareHeatMapComponent
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopHeatMapRoutingModule { }
