import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeatMapComponent} from './heat-map.component';
import {HeatMapCompareComponent} from './heat-map-compare/heat-map-compare.component';
import {HeatMapShopCompareComponent} from './heat-map-shop-compare/heat-map-shop-compare.component';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  declarations: [HeatMapComponent,
  HeatMapCompareComponent,
  HeatMapShopCompareComponent],
  exports: [HeatMapComponent]
})
export class HeatMapModule { }
