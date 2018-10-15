import {Component, OnInit} from '@angular/core';
import {CustomerTrendsEcharts} from '../trends/customer-trends-echarts';
import {ActivatedRoute} from '@angular/router';

import {DateUtil} from '../../common/date-util';
import {TrendService} from '../../service/trend-service';
import {Title} from '@angular/platform-browser';
import {AuditLogService} from "../../service/audit-log.service";
import {Globals} from "../../global";


declare var $: any;

@Component({
  templateUrl: './customer-trend.component.html'
})

export class CustomerTrendComponent implements OnInit {
  customerTrendLine: any;
  orgCode: any;
  now: any = Date.now();
  startDate: any;
  startWeek: any;
  startMonth: any;
  endDate: any;
  tabIndex: any = 0;
  dateAxis: any = [];
  weekAxis: any = [];
  passengerTraffic: any = []; // 客流量
  averageDwellTime: any = []; // 平均驻留时间
  shopTraffic: any = []; // 店均客流
  shopNum: any;
  dataIndex: any = 0;
  org: any;

  constructor(private customerTrendChar: CustomerTrendsEcharts,
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
    this.getShopNum();
    const element = document.getElementById('customerTrend');
    element.scrollIntoView();
    this.org = this.route.snapshot.data['org'];
    this.title.setTitle(this.org.name + '-客流趋势');
  }

  clearDataIndex() {
    this.dataIndex = 0;
  }

  getShopNum() {
    this.trendService.shops(this.orgCode).subscribe(result => {
      this.shopNum = result.content;
      this.getDays();
    })
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
      for (const sales of result) {
        that.initData(sales, 'day');
      }
      that.getSalesTrend();
    });
    this.auditLogService.addEventLog('coustomerTrend', `orgcode:${this.orgCode},type:day`);
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
    this.auditLogService.addEventLog('coustomerTrend', `orgcode:${this.orgCode},type:week`);
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
    this.auditLogService.addEventLog('coustomerTrend', `orgcode:${this.orgCode},type:month`);
  }

  clearArray() {
    this.passengerTraffic = [];
    this.averageDwellTime = [];
    this.shopTraffic = [];
    this.dateAxis = [];
    this.weekAxis = [];
  }

  initData(sales, style) {
    if (style === 'day') {
      this.dateAxis.push(this.formatDate(sales._id.toString()));
      this.weekAxis.push(this.dateDutil.getWeekByDay(this.format_week(sales._id.toString())));
    } else if (style === 'week') {
      this.dateAxis.push(this.formatWeek(sales._id.toString()));
    }
    this.passengerTraffic.push(sales.guestCount);
    (sales.guestCount === 0 || sales.guestCount === null) ? this.averageDwellTime.push(0) : this.averageDwellTime.push((sales.guestStayMins / sales.guestCount).toFixed(2));
    (sales.shopNum === 0 || sales.shopNum === null) ? this.shopTraffic.push(0) : this.shopTraffic.push((sales.guestCount / this.shopNum).toFixed(2));
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


  getSalesTrend() {
    this.dataIndex = this.dateAxis.length - 1;
    this.customerTrendLine = this.customerTrendChar.getTrendLine(this.dateAxis, this.weekAxis, this.passengerTraffic, this.shopTraffic, this.averageDwellTime);
  }

  mousedown() {
    this.dataIndex = this.globals.customerTrendIndex;
  }
}
