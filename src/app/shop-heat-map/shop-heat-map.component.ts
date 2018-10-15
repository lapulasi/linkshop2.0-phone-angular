import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IMyDrpOptions, MyDateRangePicker} from 'mydaterangepicker';
import {DateTimeFormatter, LocalDate} from 'js-joda';
import {HeatMapComponent} from '../heat-map/heat-map.component';

@Component({
  selector: 'app-shop-heat-map',
  templateUrl: './shop-heat-map.component.html',
  styleUrls: ['./shop-heat-map.component.css']
})
export class ShopHeatMapComponent implements OnInit {

  @ViewChild('appHeatMap') appHeatMap: HeatMapComponent;

  org;

  shopId;

  beginDate = LocalDate.now();

  endDate = LocalDate.now();

  defaultDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.beginDate = LocalDate.now();
    this.endDate = LocalDate.now();
    this.route.paramMap.subscribe(paramMap => {
      this.org = paramMap.get('orgCode');
      this.shopId = paramMap.get('shopId');
    });
  }

  onDateRangeChanged($event) {

    const beginDate = $event[0];
    const endDate = $event[1] || $event[0];
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.appHeatMap.reLoad(this.shopId, beginDate, endDate);
  }

  gotoShopListPage() {
    this.router.navigate(['shopList'],
      {relativeTo: this.route,
        queryParams: {org: this.org,
          beginDate: this.beginDate.format(DateTimeFormatter.ISO_LOCAL_DATE),
          endDate: this.endDate.format(DateTimeFormatter.ISO_LOCAL_DATE)}});
  }

  gotoDateCompareHeatMapPage() {
    this.router.navigate(['date'], {relativeTo: this.route});
  }


}
