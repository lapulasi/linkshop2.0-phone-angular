import {NgModule} from '@angular/core';
import {AmapComponent} from './amap.component';
import {RouterModule, Routes} from '@angular/router';
import {TitleResolver} from "../resolve/title.resolver";
import {TokenResolver} from "../resolve/token.resolver";
import {SearchShopComponent} from "./search-shop/search-shop.component";

const routes: Routes = [
  {
    path: 'index/:orgCode/:gadcode',
    component: AmapComponent,
    resolve: {
      token: TokenResolver,
      org: TitleResolver
    },
    children: [
      {
        path: 'search',
        component: SearchShopComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AmapRoutingModule { }
