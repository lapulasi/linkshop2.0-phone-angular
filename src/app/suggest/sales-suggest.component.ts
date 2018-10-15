import {Component, Input, OnInit} from '@angular/core';
import {SalesSuggestEcharts} from './trends/sales-suggest-echarts';
import {DateTimeFormatter, LocalDate} from 'js-joda';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
import {pipe} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './sales-suggest.component.html'
})

export class SalesSuggestComponent implements OnInit {
  orgCode: number;
  orgId = 1;

  averageSalesType = 'week';
  averageSales: any;

  displaySet = new Set();
  fieldList = ['salesVolume', 'salesAmount', 'avgPrice', 'guestAvgPrice', 'transferRatio', 'hourEffectiveness'];


  weeklyAnalysisType: number | string = 7;
  weeklyAnalysisData = [];
  weeklyAnalysisEcharts;

  weeklyAnalysis1: any;
  weeklyAnalysis2: any;


  salesCompetitiveness: any;
  salesCompetitivenessType: number | string = 7;
  org: any;

  constructor(private salesSuggest: SalesSuggestEcharts,
              private http: HttpClient,
              private route: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit() {
    const element = document.getElementById('sales-suggest');
    element.scrollIntoView();
    this.route.paramMap.subscribe(paramMap => {
      this.orgCode = Number.parseInt(paramMap.get('orgCode'));
      this.saleData(8, 'week');


      this.weeklyAnalysisEcharts = this.salesSuggest.getWeeklyAnalysis1();
      this.salesCompetitiveness = this.salesSuggest.getSalesCompetitiveness();

      this.selectField('salesAmount');
      this.selectField('salesVolume');
      this.selectField('avgPrice');


      this.getAverageSales();
      this.weeklyAnalysis(30);
      this.getSalesCompetitiveness(30);

    });
    this.org = this.route.snapshot.data['org'];
    this.title.setTitle(this.org.name + '-销售参谋');

  }

  saleData(n: number, type: string): void {
    this.averageSalesType = type;
    const url = type === 'week' ? `/org/weekStat/${this.orgCode}` : `/org/monthStat/${this.orgCode}`;
    const today = LocalDate.now();
    const startDate = today.minusWeeks(8).format(DateTimeFormatter.ISO_LOCAL_DATE);
    const endDate = today.format(DateTimeFormatter.ISO_LOCAL_DATE);
    this.http.get(url, {params: {startDate, endDate}}).subscribe((result: Array<any>) => {
      const xAxisDateArray = Array.from(Array(8).keys())
        .map(value => {
          if (type === 'week') {
            return today.minusWeeks(value).format(
              DateTimeFormatter.ofPattern('MM-dd'));
          } else {
            return today.minusMonths(value).format(
              DateTimeFormatter.ofPattern('MM月'));
          }
        }).reverse();
      if (result.length > 8) {
        result = result.slice(result.length - 8);
      }

      if (result.length < 8) {
        result.unshift(...Array.from(Array(8 - result.length).keys()).map(value => ({
          'salesAmount': 0,
          'salesVolume': 0
        })));
      }

      const options = this.salesSuggest.getAverageSales();
      options['xAxis'] ['data'] = xAxisDateArray;
      options.series.find(value => value.type === 'line').data = result.map(value => <number>value['salesAmount']);
      options.series.find(value => value.type === 'bar').data = result.map(value => <number>value['salesVolume']);
      this.averageSales = options;
    });

  }

  weeklyAnalysis(n?: number): void {
    this.weeklyAnalysisType = n;
    const options = {};
    if (n) {
      const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
      const startDate = LocalDate.now().minusDays(n).format(DateTimeFormatter.ISO_LOCAL_DATE);
      options['params'] = {startDate, endDate};
    }

    this.http.get(`/org/dayStat/${this.orgCode}`, options).subscribe((result: Array<any>) => {
      const data = result.map(value => {
        value['dayOfWeek'] = LocalDate.parse(value['_id'], DateTimeFormatter.ofPattern('yyyyMMdd')).dayOfWeek().value();
        return value;
      })
        .reduce((previousValue, currentValue) => {
          (previousValue[currentValue['dayOfWeek']] = previousValue[currentValue['dayOfWeek']] || [])
            .push(currentValue);
          return previousValue;
        }, []).map((value: Array<any>) => {
          return value.reduce((previousValue, currentValue) => {
            previousValue['guestCount'] = (previousValue['guestCount'] || 0) + currentValue['guestCount'];
            previousValue['salesVolume'] = (previousValue['salesVolume'] || 0) + currentValue['salesVolume'];
            previousValue['salesAmount'] = (previousValue['salesAmount'] || 0) + currentValue['salesAmount'];
            previousValue['businessHours'] = (previousValue['businessHours'] || 0) + currentValue['businessHours'];
            return previousValue;
          }, {});
        }).map(value => {
          value['hourEffectiveness'] = value['salesAmount'] / value['businessHours'] || 0;
          value['avgPrice'] = value['salesAmount'] / value['salesVolume'] || 0;
          value['guestAvgPrice'] = value['salesAmount'] / value['guestCount'] || 0;
          value['transferRatio'] = (value['salesVolume'] / value['guestCount']) || 0;
          return value;
        }).reduce((previousValue, currentValue) => {
          (previousValue['salesAmount'] = previousValue['salesAmount'] || []).push(currentValue['salesAmount']);
          (previousValue['salesVolume'] = previousValue['salesVolume'] || []).push(currentValue['salesVolume']);
          (previousValue['hourEffectiveness'] = previousValue['hourEffectiveness'] || []).push(currentValue['hourEffectiveness']);
          (previousValue['avgPrice'] = previousValue['avgPrice'] || []).push(currentValue['avgPrice']);
          (previousValue['guestAvgPrice'] = previousValue['guestAvgPrice'] || []).push(currentValue['guestAvgPrice']);
          (previousValue['transferRatio'] = previousValue['transferRatio'] || []).push(currentValue['transferRatio']);

          return previousValue;
        }, {});
      this.weeklyAnalysisData = data;
      console.log(this.weeklyAnalysisData)

      this.displaySet.forEach(value => this.display(value));
    });

  }

  display(field: string): void {
    const index = this.fieldList.indexOf(field);
    const data = this.weeklyAnalysisData[field] || [];
    this.weeklyAnalysisEcharts = Object.assign({}, this.weeklyAnalysisEcharts);

    this.weeklyAnalysisEcharts.series[index]['data'] = data || [];
    this.weeklyAnalysisEcharts.yAxis[index]['max'] = Math.max(...data, 0);
    this.weeklyAnalysisEcharts.yAxis[index]['min'] = Math.min(...data, 0);
  }

  selectField(field: string): void {
    if (!this.displaySet.has(field) && this.displaySet.size < 3) {
      this.display(field);
      this.displaySet.add(field);
    } else if (this.displaySet.has(field)) {
      const newEcharts = Object.assign({}, this.weeklyAnalysisEcharts);
      const index = this.fieldList.indexOf(field);
      newEcharts.series[index]['data'] = [];
      this.weeklyAnalysisEcharts = newEcharts;
      this.displaySet.delete(field);
    }
  }

  isDisplayed(field: string): boolean {
    return this.displaySet.has(field);
  }

  getAverageSales() {
    this.averageSales = this.salesSuggest.getAverageSales();
  }

  getWeeklyAnalysis1() {
    this.weeklyAnalysis1 = this.salesSuggest.getWeeklyAnalysis1();
  }

  getWeeklyAnalysis2() {
    this.weeklyAnalysis2 = this.salesSuggest.getWeeklyAnalysis2();
  }

  getSalesCompetitiveness(n: number | string) {
    const options = {};
    this.salesCompetitivenessType = n;
    if (n !== 'all') {
      const endDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
      const startDate = LocalDate.now().minusDays(<number>n).format(DateTimeFormatter.ISO_LOCAL_DATE);
      options['params'] = {startDate, endDate};
    }

    this.http.get(`/org/dayStat/${this.orgCode}/children`, options).subscribe(
      (result: Array<any>) => {
        const newEcharts = Object.assign({}, this.salesCompetitiveness);

        newEcharts.series[0]['data'] = Object.values(result
          .reduce((previousValue, currentValue) => {
            (previousValue[currentValue['shopId']] = previousValue[currentValue['shopId']] || {});
            previousValue[currentValue['shopId']]['shopName'] = currentValue['shopName'];
            previousValue[currentValue['shopId']]['salesAmount'] =
              (previousValue[currentValue['shopId']]['salesAmount'] || 0) + currentValue['salesAmount'];
            previousValue[currentValue['shopId']]['salesVolume'] =
              (previousValue[currentValue['shopId']]['salesVolume'] || 0) + currentValue['salesVolume'];
            previousValue[currentValue['shopId']]['guestCount'] =
              (previousValue[currentValue['shopId']]['guestCount'] || 0) + currentValue['guestCount'];
            return previousValue;
          }, {}))
          .map(value => ({
              name: value['shopName'],
              value: [(value['salesVolume'] / value['guestCount']), value['salesAmount']],
              emphasis: {itemStyle: {color: '#FF7474'}}
            })
          );

        this.salesCompetitiveness = newEcharts;
      }
    );
  }


}
