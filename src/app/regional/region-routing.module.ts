import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestComponent} from './guest/guest.component';
import {SalesComponent} from './sales/sales.component';
import {ShopComponent} from './shop/shop.component';

const routes: Routes = [
  {
    path: 'guest/:orgCode/:gadcode',
    component: GuestComponent,
    data: {'title': '客流表现'}
  },
  {
    path: 'sales/:orgCode/:gadcode',
    component: SalesComponent,
    data: {'title': '销售表现'}
  },
  {
    path: 'shop/:orgCode/:gadcode',
    component: ShopComponent,
    data: {'title': '门店表现'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegionRoutingModule { }
