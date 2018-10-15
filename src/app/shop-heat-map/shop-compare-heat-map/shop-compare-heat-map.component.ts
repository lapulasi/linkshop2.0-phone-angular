import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop-compare-heat-map',
  templateUrl: './shop-compare-heat-map.component.html',
  styleUrls: ['./shop-compare-heat-map.component.css']
})
export class ShopCompareHeatMapComponent implements OnInit {

  originShopId;

  comparedShopId;

  beginDate;

  endDate;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.originShopId = paramMap.get('shopId');
      this.comparedShopId = paramMap.get('comparedShopId');
    });
    this.route.queryParamMap.subscribe(queryParamMap => {

      this.beginDate = queryParamMap.get('beginDate');
      this.endDate = queryParamMap.get('endDate');
    });
  }

}
