import {Component, OnInit} from '@angular/core';
import {StoreTrendsEcharts} from '../trends/store-trends-echarts';
import {ActivatedRoute} from '@angular/router';
import {DateUtil} from '../../common/date-util';
import {TrendService} from '../../service/trend-service';
import {Title} from '@angular/platform-browser';
import {AuditLogService} from "../../service/audit-log.service";
import {Globals} from "../../global";

declare var $: any;

@Component({
  templateUrl: './store-trend.component.html'
})

export class StoreTrendComponent implements OnInit {

  storeTrendLine1: any;
  storeTrendbar1: any;
  storeTrendbar2: any;
  storeTrendLine2: any;
  orgCode: any;
  now: any = Date.now();
  startDate: any;
  startWeek: any;
  startMonth: any;
  endDate: any;
  dateAxis: any;
  weekAxis: any = [];
  tabIndex: any = 0;
  pingEffect: any = []; // 坪效
  humanEffect: any = []; // 人效
  flowCapacity: any = []; // 集客力
  workTime: any = []; // 工作时长
  quanArrive: any = []; // 圈长到店
  serviceAbility: any = []; // 服务能力
  dataIndex: any = 0;
  dataIndex1: any = 0;
  shopNum: any; // 门店数
  org: any;

  constructor(private storeTrendsChar: StoreTrendsEcharts,
              private auditLogService: AuditLogService,
              private route: ActivatedRoute,
              private dateDutil: DateUtil,
              private trendService: TrendService,
              private title: Title,
              private globals: Globals) {
  }

  ngOnInit() {
    const orgCode = this.route.snapshot.params.orgCode;
    this.orgCode = orgCode;
    const element = document.getElementById('storeTrends');
    element.scrollIntoView();
    this.getShopNum();
    this.org = this.route.snapshot.data['org'];
    this.title.setTitle(this.org.name + '-门店趋势');
  }

  getShopNum() {
    this.trendService.shops(this.orgCode).subscribe(result => {
      this.shopNum = result.content;
      this.getDays();
      // console.log(this.shopNum);
    });
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
      // console.log(result)
      for (const sales of result) {
        that.initData(sales, 'day');
      }
      that.getSalesTrend();
    });
    this.auditLogService.addEventLog('storeTrend', `orgcode:${this.orgCode},type:day`);
  }

  getWeekStat() {
    this.tabIndex = 1;
    this.clearDataIndex();
    const that = this;
    this.clearArray();
    this.trendService.weekStat(this.orgCode, this.startWeek, this.endDate).subscribe(result => {
      // console.log(JSON.stringify(result, null, 4));
      for (const sales of result) {
        that.initData(sales, 'week');
      }
      // console.log(this.dateAxis);
      that.getSalesTrend();
    });
    this.auditLogService.addEventLog('storeTrend', `orgcode:${this.orgCode},type:week`);
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
    this.auditLogService.addEventLog('storeTrend', `orgcode:${this.orgCode},type:month`);
  }

  clearArray() {
    this.pingEffect = [];
    this.dateAxis = [];
    this.weekAxis = [];
    this.humanEffect = [];
    this.flowCapacity = [];
    this.workTime = [];
    this.quanArrive = [];
    this.serviceAbility = [];
  }

  initData(sales, style) {
    (sales.staffNum === 0 || sales.staffNum === null || sales.shopNum === 0 || sales.shopNum === null) ? this.workTime.push(0) : this.workTime.push((sales.workMins / 60 / (sales.staffNum * this.shopNum)).toFixed(2)); // 门店面积和员工数是平均值，所以要乘以门店数表示总面积和总员工数
    if (style === 'day') {
      this.dateAxis.push(this.formatDate(sales._id.toString()));
      this.weekAxis.push(this.dateDutil.getWeekByDay(this.format_week(sales._id.toString())));
    } else if (style === 'week') {
      this.dateAxis.push(this.formatWeek(sales._id.toString()));
    }
    (sales.shopArea === 0 || sales.shopArea === null) ? this.pingEffect.push(0) : this.pingEffect.push((sales.salesAmount / (sales.shopArea * this.shopNum)).toFixed(2));
    (sales.staffNum === 0 || sales.staffNum === null) ? this.humanEffect.push(0) : this.humanEffect.push((sales.salesAmount / sales.staffNum).toFixed(2));
    this.quanArrive.push(sales.managerAccessCount);
    (sales.staffNum === 0 || sales.staffNum === null) ? this.serviceAbility.push(0) : this.serviceAbility.push((sales.guestCount / sales.staffNum).toFixed(2));
    (sales.shopArea === 0 || sales.shopArea === null) ? this.flowCapacity.push(0) : this.flowCapacity.push((sales.guestCount / (sales.shopArea * this.shopNum)).toFixed(2));
  }

  getSalesTrend() {
    this.dataIndex = this.dataIndex1 = this.dateAxis.length - 1;
    this.storeTrendLine1 = this.storeTrendsChar.getStoreTrend1(this.dateAxis, this.weekAxis, this.pingEffect, this.humanEffect, this.flowCapacity);
    this.storeTrendLine2 = this.storeTrendsChar.getStoreTrend4(this.dateAxis, this.weekAxis, this.quanArrive, this.serviceAbility, this.workTime);
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
    this.dataIndex = this.globals.storeTrendIndex;
  }
  mousedown1() {
    this.dataIndex1 = this.globals.storeTrendIndex1;
  }
}
