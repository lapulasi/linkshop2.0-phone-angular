import {Component, OnInit, ViewChild} from '@angular/core';
import {IMyDrpOptions, MyDateRangePicker} from 'mydaterangepicker';
import {HeatMapComponent} from '../../heat-map/heat-map.component';
import {DateTimeFormatter, LocalDate} from 'js-joda';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-date-compare-heat-map',
  templateUrl: './date-compare-heat-map.component.html',
  styleUrls: ['./date-compare-heat-map.component.css']
})
export class DateCompareHeatMapComponent implements OnInit {

  org;

  shopId;

  @ViewChild('appHeatMap1') appHeatMap1: HeatMapComponent;

  @ViewChild('appHeatMap2') appHeatMap2: HeatMapComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {

      this.org = paramMap.get('org');
      this.shopId = paramMap.get('shopId');
    });
  }


  onDateRangeChanged1($event) {
    const beginDate = $event[0];
    const endDate = $event[1] || $event[0];
    this.appHeatMap1.reLoad(this.shopId, beginDate, endDate);
  }

  onDateRangeChanged2($event) {
    const beginDate = $event[0];
    const endDate = $event[1] || $event[0];
    this.appHeatMap2.reLoad(this.shopId, beginDate, endDate);
  }
}
