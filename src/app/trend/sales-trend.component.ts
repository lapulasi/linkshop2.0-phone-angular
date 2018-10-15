import {Component, OnInit} from '@angular/core';
import {SalesTrendsEcharts} from './trends/sales-trends-echarts';
import {ActivatedRoute} from '@angular/router';
import {DateUtil} from '../common/date-util';
import {TrendService} from '../service/trend-service';
import {Title} from '@angular/platform-browser';
import {AuditLogService} from "../service/audit-log.service";
import {Globals} from "../global";

declare var $: any;

@Component({
  templateUrl: 'sales-trend.component.html'
})

export class SalesTrendComponent implements OnInit {

  orgCode: any;
  salesTrendLine1: any;
  salesTrendLine2: any;
  salesTrendLine3: any;
  salesTrendbar: any;
  now: any = Date.now();
  startDate: any;
  startWeek: any;
  startMonth: any;
  endDate: any;
  salesAmount: any = []; // 营业额
  averageSales: any = []; // 均价
  guestAverage: any = []; // 客流均价
  salesVolume: any = []; // 销量
  conversionRates: any = []; // 转化率
  hoursRatio: any = []; // 时效

  dateAxis: any = []; // 曲线的x轴时间
  weekAxis: any = [];

  tabIndex: any = 0;
  dataIndex: any = 0;
  dataIndex1: any = 0;
  org: any;

  constructor(private salesTrendsChar: SalesTrendsEcharts,
              private route: ActivatedRoute,
              private auditLogService: AuditLogService,
              private dateDutil: DateUtil,
              private trendService: TrendService,
              private title: Title,
              private globals: Globals) {
  }

  ngOnInit() {
    const orgCode = this.route.snapshot.params.orgCode;
    this.orgCode = orgCode;
    this.getDays();
    const element = document.getElementById('salesTrends');
    element.scrollIntoView();
    this.org = this.route.snapshot.data['org'];
    this.title.setTitle(this.org.name + '-销售趋势');
  }

  clearDataIndex() {
    this.dataIndex = 0;
    this.dataIndex1 = 0;
  }

  getDays() {
    this.endDate = this.dateDutil.formatDate(this.now);
    const currDate = new Date();
    const start_time = new Date(currDate.getTime() - 24 * 3600 * 1000 * 30);
    const start_week = new Date(currDate.getTime() - 24 * 3600 * 1000 * 7 * 12);
    const start_month = new Date(currDate.getTime() - 24 * 3600 * 1000 * 7 * 4 * 12);
    this.startDate = this.dateDutil.formatDate(start_time);
    this.startWeek = this.dateDutil.formatDate(start_week);
    this.startMonth = this.dateDutil.formatDate(start_month);
    // console.log(this.startDate + '//' + this.endDate);
    this.getDayStat();
  }

  getDayStat() {
    this.tabIndex = 0;
    this.clearDataIndex();
    const that = this;
    this.clearArray();
    this.trendService.dayStat(this.orgCode, this.startDate, this.endDate).subscribe(result => {
      // console.log(result);
      for (const sales of result) {
        that.initData(sales, 'day');
      }
      that.getSalesTrend();
    });
    this.auditLogService.addEventLog('salesTrend', `orgcode:${this.orgCode},type:day`);
  }

  getWeekStat() {
    this.tabIndex = 1;
    this.clearDataIndex();
    const that = this;
    this.clearArray();
    this.trendService.weekStat(this.orgCode, this.startWeek, this.endDate).subscribe(result => {
      for (const sales of result) {
        that.initData(sales, 'week');
      }
      that.getSalesTrend();
    });
    this.auditLogService.addEventLog('salesTrend', `orgcode:${this.orgCode},type:week`);
  }

  getMonthStat() {
    this.tabIndex = 2;
    this.clearDataIndex();
    const that = this;
    this.clearArray();
    this.trendService.monthStat(this.orgCode, this.startMonth, this.endDate).subscribe(result => {
      for (const sales of result) {
        that.initData(sales, 'week');
      }
      that.getSalesTrend();
    });
    this.auditLogService.addEventLog('salesTrend', `orgcode:${this.orgCode},type:month`);
  }

  clearArray() {
    this.salesAmount = [];
    this.dateAxis = [];
    this.weekAxis = [];
    this.averageSales = [];
    this.guestAverage = [];
    this.hoursRatio = [];
    this.salesVolume = [];
    this.conversionRates = [];
  }

  initData(sales, style) {
    this.salesAmount.push(sales.salesAmount);
    if (style === 'day') {
      this.dateAxis.push(this.formatDate(sales._id.toString()));
      this.weekAxis.push(this.dateDutil.getWeekByDay(this.format_week(sales._id.toString())));
    } else if (style === 'week') {
      this.dateAxis.push(this.formatWeek(sales._id.toString()));
    }
    (sales.salesVolume === 0 || sales.salesVolume === null) ? this.averageSales.push(0) : this.averageSales.push((sales.salesAmount / sales.salesVolume).toFixed(2)
    );
    (sales.guestCount === 0 || sales.guestCount === null) ? this.guestAverage.push(0) : this.guestAverage.push((sales.salesAmount / sales.guestCount).toFixed(2));
    this.salesVolume.push(sales.salesVolume);
    (sales.guestCount === 0 || sales.guestCount === null) ? this.conversionRates.push(0) : this.conversionRates.push((sales.salesVolume / sales.guestCount).toFixed(4));
    (sales.businessHours === 0 || sales.businessHours === null) ? this.hoursRatio.push(0) : this.hoursRatio.push((sales.salesVolume / sales.businessHours).toFixed(2));
  }

  getSalesTrend() {
    this.dataIndex = this.dataIndex1 = this.dateAxis.length - 1;
    this.salesTrendLine1 = this.salesTrendsChar.getSalesTrends1(this.dateAxis, this.weekAxis, this.salesAmount, this.averageSales, this.guestAverage);
    this.salesTrendLine3 = this.salesTrendsChar.getSalesTrends3(this.dateAxis, this.weekAxis, this.conversionRates, this.hoursRatio, this.salesVolume);
  }


  formatDate(date) {
    const format_date = date.substring(4, 6) + '.' + date.substring(6);
    return format_date;
  }

  formatWeek(date) {
    const format_week = date.substring(4);
    return format_week;
  }

  format_week(date) {
    const format_date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6);
    return format_date;
  }

  mousedown() {
    this.dataIndex = this.globals.salesTrendIndex;
    // console.log(this.globals.customerTrendIndex)
  }
  mousedown1() {
    this.dataIndex1 = this.globals.salesTrendIndex1;
    // console.log(this.globals.customerTrendIndex)
  }
}
