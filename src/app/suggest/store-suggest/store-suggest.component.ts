import {Component, OnInit} from '@angular/core';
import {StoreSuggestEcharts} from '../trends/store-suggest-echarts';
import {HttpClient} from '@angular/common/http';
import {ChronoUnit, DateTimeFormatter, LocalDate} from 'js-joda';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {WeekDay} from '@angular/common';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: './store-suggest.component.html'
})

export class StoreSuggestComponent implements OnInit {

  orgCode: string;

  orgId = 1;

  growthTrendEchartsOptions: any;
  growthTrendType = 'week';
  growthTrendData = [];

  growthTrendEndDate ;
  growthTrendStartDate;

  dayService: any;
  dayServiceData = [];
  growthTrend: any;
  org: any;

  displaySet = new Set();
  fieldList = ['areaEffect', 'staffEffect', 'collectGuestEffect', 'workMins', 'managerAccessCount', 'serviceEffect'];

  growthTrendBarEcharts;

  constructor(private storeSuggest: StoreSuggestEcharts, private http: HttpClient,
              private route: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit() {
    const element = document.getElementById('shop-suggest');
    element.scrollIntoView();
    this.growthTrendBarEcharts = window['echarts'].init(<HTMLDivElement>document.getElementById('growth-trend-bar'));
    this.growthTrendBarEcharts.on('datazoom', (params) => {
      if (params['batch'][0]['start'] === 0) {
        const tempStartDate = this.growthTrendStartDate;
        this.growthTrendStartDate = LocalDate.parse(tempStartDate).minus(9, this._toChronoUnit(this.growthTrendType))
          .format(DateTimeFormatter.ISO_LOCAL_DATE);

        this._request_growth_trend(this.growthTrendType, this.growthTrendStartDate, tempStartDate)
          .subscribe((result: Array<any>) => {

            const aggregated_data = this._aggregation(result);
            this.growthTrendData.unshift(...aggregated_data[0]) ;
            this.growthTrendEchartsOptions['xAxis']['data'].unshift(...aggregated_data[1]);
            this._append_data(aggregated_data[0]);
            console.log(this.growthTrendEchartsOptions);
            this.growthTrendBarEcharts.setOption(this.growthTrendEchartsOptions);
          });
      }


    });
    this.route.paramMap.subscribe(paramMap => {
      this.orgCode = paramMap.get('orgCode');
      this.growthTrendEchartsOptions = this.storeSuggest.getGrowthTrendBar();
      this.getGrowthTrend('day');


      this.getDayService(7);
    });
    this.org = this.route.snapshot.data['org'];
    this.title.setTitle(this.org.name + '-门店参谋');

  }
  _toChronoUnit(type: string): ChronoUnit {
    if (type === 'day') {
      return ChronoUnit.DAYS;
    } else if (type === 'week') {
      return ChronoUnit.WEEKS;
    } else {
      return ChronoUnit.MONTHS;
    }
  }

  getGrowthTrend(type: string): void {
    this.growthTrendType = type;
    this.growthTrendEndDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.growthTrendStartDate = LocalDate.now().minus(9, this._toChronoUnit(this.growthTrendType)).format(DateTimeFormatter.ISO_LOCAL_DATE);
    this._request_growth_trend(this.growthTrendType, this.growthTrendStartDate, this.growthTrendEndDate).subscribe((result: Array<any>) => {

      const aggregated_data = this._aggregation(result);
      this.growthTrendData = aggregated_data[0];
      this.growthTrendEchartsOptions['xAxis']['data'] = aggregated_data[1];
      this._append_data(aggregated_data[0]);
      this.growthTrendBarEcharts.setOption(this.growthTrendEchartsOptions);
      this.displayField('areaEffect');
      this.displayField('staffEffect');
      this.displayField('collectGuestEffect');
    });

  }

  _append_data(data: Array<any>): void {
    this.growthTrendEchartsOptions.series.forEach((value) => {
      value['data'].unshift(...data.map(value2 => value2[value['name']]));
    } );
  }

  _request_growth_trend(type: string, startDate: string, endDate: string): Observable<Object> {

    let serviceUrl = '';
    const range = 9;
    switch (type) {
      case 'day':
        serviceUrl = '/org/dayStat/' + this.orgCode;
        break;
      case 'week':
        serviceUrl = '/org/weekStat/' + this.orgCode;
        break;
      case 'month':
        serviceUrl = '/org/monthStat/' + this.orgCode;
        break;
    }

    return this.http.get(serviceUrl, {params: {startDate, endDate}});

  }

  _aggregation(result: Array<any>): [Array<any>, Array<any>] {
    const data = result.map(value => ({
      areaEffect: value['salesAmount'] / value['shopArea'] || 0,
      staffEffect: value['salesAmount'] / value['staffNum'] || 0,
      collectGuestEffect: value['guestCount'] / value['shopArea'] || 0,
      serviceEffect: value['guestCount'] / value['staffNum'] || 0,
      workMins: value['workMins'],
      managerAccessCount: value['managerAccessCount']

    })).map((value, index, array) => {
      if (index < array.length - 1) {
        return{
          areaEffect: ((array[index + 1]['areaEffect'] - value['areaEffect']) / value['areaEffect'] ) || 0,
          staffEffect: ((array[index + 1]['staffEffect'] - value['staffEffect']) / value['staffEffect'] ) || 0,
          collectGuestEffect: ((array[index + 1]['collectGuestEffect'] - value['collectGuestEffect']) / value['collectGuestEffect'] ) || 0,
          serviceEffect: ((array[index + 1]['serviceEffect'] - value['serviceEffect']) / value['serviceEffect'] ) || 0,
          workMins: ((array[index + 1]['workMins'] - value['workMins']) / value['workMins'] ) || 0,
          managerAccessCount: ((array[index + 1]['managerAccessCount'] - value['managerAccessCount']) / value['managerAccessCount'] ) || 0

        };

      } else {
        return {};
      }
    }).slice(0, -1);

    const xAiaxs = result.slice(1).map(value => {
      if (this.growthTrendType === 'day') {
        return LocalDate.parse(value['_id'], DateTimeFormatter.ofPattern('yyyyMMdd')).format(DateTimeFormatter.ofPattern('MM.dd'));
      } else if (this.growthTrendType === 'week') {
        return value['_id'];
      } else {
        return value['_id'];
      }
    });


    return [data, xAiaxs];
  }

  toggle(field: string): void {
    this.growthTrendEchartsOptions.legend.selected[field] = !this.growthTrendEchartsOptions.legend.selected[field];
    this.growthTrendBarEcharts.dispatchAction({
      type: 'legendToggleSelect',
      // 图例名称
      name: field
    });
  }

  displayField(field: string): void {
    if (!this.displaySet.has(field) && this.displaySet.size < 3) {
      this.displaySet.add(field);
      this.toggle(field);
    } else if (this.displaySet.has(field) ) {
      this.displaySet.delete(field);
      this.toggle(field);
    }
  }

  isDisplayed(field: string): boolean {
    return this.displaySet.has(field);
  }

  getDayService(n: number) {
    const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    const startDate = LocalDate.now().minusDays(n).format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.http.get('/org/dayStat/' + this.orgCode, {params: {startDate, endDate}}).subscribe((result: Array<any>) => {
    });
  }

}
