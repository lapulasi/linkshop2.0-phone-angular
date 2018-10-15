import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeatMapCompareComponent} from './heat-map-compare/heat-map-compare.component';
import {HeatMapShopCompareComponent} from './heat-map-shop-compare/heat-map-shop-compare.component';

const routes: Routes = [

  {
    path: 'compare',
    component: HeatMapCompareComponent
  },
  {
    path: 'shop/compare',
    component: HeatMapShopCompareComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeatMapRoutingModule { }
