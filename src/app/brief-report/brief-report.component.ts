import {Component, OnInit} from '@angular/core';
import {BriefReportEcharts} from './brief-report-echarts';
import {ShopGuestService} from '../service/shop-guest.service';
import {DateUtil} from '../common/date-util';
import {TrendService} from '../service/trend-service';
import {OrgService} from '../service/org.service';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {WeatherService} from '../service/weather.service';
@Component({
  templateUrl: './brief-report.html',
})

export class BriefReportComponent implements OnInit {
  salesShort: any;
  flowShort: any;
  onTheJob: any;
  normalRate: any;

  orgCode: any;
  adcode: any = 0;
  startDate: any;
  endDate: any;

  salesBrief: any;
  dataAxis: any = [];
  weekAxis: any = [];
  normalRateData: any = [];
  workTimeList: any = [];
  yesWorkTime: any;
  isOnDuty: any;
  staffNum: any;
  ondutyStaffNum: any;
  todayWeatherInfo: any = [];
  yestodayWeatherInfo: any = [];
  recentWeather: any = [];
  currentWeather: any;
  yesWeather: any;
  today: any;
  yesterDay: any;
  isShop = false;
  guestCountChangeData: any = []; // 客流变化
  org:any;

  constructor(private briefReport: BriefReportEcharts,
              private guestService: ShopGuestService,
              private trendService: TrendService,
              private dateUtil: DateUtil,
              private weatherService: WeatherService,
              private orgService: OrgService,
              private route: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit() {
    this.orgCode = this.route.snapshot.params['orgCode'];
    // console.log(this.orgCode);
    this.today = this.dateUtil.formatDate(Date.now());
    this.yesterDay = this.dateUtil.getRangeDate(-1);
    this.getOrgGuest();
    this.getBrief(); // 获取销售简述和客流简述
    this.getAdCode();
    this.org = this.route.snapshot.data['org'];
    this.title.setTitle(this.org.name + '-简报');
  }

  getCurrentWeather() {
    this.trendService.singleWeather(this.orgCode, this.today).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      let weather;
      if (data.weather == null) {
        weather = {name: '-'};
      } else {
        weather = data.weather;
      }
      this.currentWeather = this.weatherService.getWeatherDescribe(weather);
    });
  }

  getYesWeather() {
    this.trendService.singleWeather(this.orgCode, this.yesterDay).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      let weather;
      if (data.weather == null) {
        weather = {name: '-'};
      } else {
        weather = data.weather;
      }
      this.yesWeather = this.weatherService.getWeatherDescribe(weather);
    });
  }

  getAdCode() {
    this.orgService.getOrgByCode(this.orgCode).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.adcode = data.adcode;
      this.isShop = data.orgLevel.shop;
      this.getYestodayWorkTime(); // 昨日工作时长
      if (!this.isShop) {
        this.getOnDuty();
        this.yesterdayWeather();
      } else {
        this.getCurrentWeather();
        this.getYesWeather();
        this.getRecentWeather();
      }
    });
  }

  getRecentWeather() {
    this.trendService.recentWeather(this.adcode).subscribe(data => {
      console.log(JSON.stringify(data, null, 4));
      const casts = data.forecasts[0].casts;
      for (let i = 1, len = casts.length; i < len; i++) {
        this.recentWeather.push({
          date: this.formatDay(casts[i].date),
          week: this.formatWeek(casts[i].week),
          weather: this.weatherService.getWeatherDescribe(casts[i].dayweather)
        });
      }
      console.log(this.recentWeather);
    });
  }

  todayWeather() {
    this.trendService.todayWeather(this.orgCode, this.today).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      for (let i = 0, len = data.length; i < len; i++) {
        let todayWeather, yesterdayWeather;
        if (data[i].weather == null && this.yestodayWeatherInfo[i].weather !== null) {
          todayWeather = {name: '-'};
          yesterdayWeather = this.yestodayWeatherInfo[i].weather.weather;
        } else if (this.yestodayWeatherInfo[i].weather == null && data[i].weather !== null) {
          todayWeather = data[i].weather.weather;
          yesterdayWeather = {name: '-'};
        } else if (data[i].weather == null && this.yestodayWeatherInfo[i].weather == null) {
          todayWeather = {name: '-'};
          yesterdayWeather = {name: '-'};
        } else {
          todayWeather = data[i].weather.weather;
          yesterdayWeather = this.yestodayWeatherInfo[i].weather.weather;
        }
        this.todayWeatherInfo.push({
          name: data[i].org.name,
          todayWeather: this.weatherService.getWeatherDescribe(todayWeather),
          yesterdayWeather: this.weatherService.getWeatherDescribe(yesterdayWeather)
        });
      }
      // console.log(this.todayWeatherInfo);
    });
  }

  yesterdayWeather() {
    this.trendService.todayWeather(this.orgCode, this.yesterDay).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.yestodayWeatherInfo = data;
      this.todayWeather();
    });
  }

  getOrgGuest() {
    // 125102106107///0
    this.guestService.getOrgGuest(this.orgCode, this.adcode, this.yesterDay, this.yesterDay).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.salesBrief = data;
    });
  }

  getBrief() {
    const dateArr = this.dateUtil.getRangeDate(-6, 'more');
    // this.getWeekAxis(dateArr);
    const salesVolume = [];
    const salesAmount = [];
    const guestCount = [];
    const weekAxis = [];
    this.trendService.dayStat(this.orgCode, dateArr[0], dateArr[dateArr.length - 1]).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      for (const i of data) {
        this.dataAxis.push(this.formatDate(i._id.toString()));
        this.weekAxis.push(this.dateUtil.getWeekByDay(this.format_week(i._id.toString())));
        salesVolume.push(i.salesVolume);
        salesAmount.push((i.salesAmount / 1000).toFixed(1));
        guestCount.push(i.guestCount);
        this.workTimeList.push((i.workMins / 60).toFixed(2));
        this.normalRateData.push((i.normalNum / (i.abnormalNum + i.normalNum)).toFixed(2));
      }
      this.guestCountChange(salesVolume, salesAmount, guestCount);
      this.onTheJob = this.briefReport.getOnTheJob(this.workTimeList, this.dataAxis, this.weekAxis);
      this.getNormalRateTrend();
      // this.getOnJob(); // 获取销售顾问在岗
    });
  }

  guestCountChange(salesVolume, salesAmount, guestCount) {
    this.guestCountChangeData.push(guestCount[0]);
    for (let i = 1, len = guestCount.length; i < len; i++) {
      this.guestCountChangeData.push(guestCount[i] - guestCount[i - 1]);
    }
    this.getSalesTrends(salesVolume, salesAmount, guestCount, this.guestCountChangeData);
  }

  getWeekAxis(dataArr) {
    for (let i = 0, len = dataArr.length; i < len; i++) {
      this.weekAxis.push(this.dateUtil.getWeekByDay(dataArr[i]));
    }
  }

  getSalesTrends(salesVolume, salesAmount, guestCount, guestCountChangeData) {
    this.salesShort = this.briefReport.getSalesShort(salesVolume, salesAmount, this.dataAxis, this.weekAxis);
    this.flowShort = this.briefReport.getFlowShort(guestCount, guestCountChangeData, this.dataAxis, this.weekAxis);
  }

  getNormalRateTrend() {
    this.normalRate = this.briefReport.getNormalRate(this.normalRateData, this.dataAxis, this.weekAxis);
  }

  /*getOnJob() {
    const dateArr = this.dateUtil.getRangeDate(-6, 'more');
    this.trendService.getWorkList(this.orgCode, dateArr[0], dateArr[dateArr.length - 1]).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      const dataAxis = [];
      const weekAxis = [];
      for (const i of data) {
        dataAxis.push(this.formatDate(i._id.toString()));
        weekAxis.push(this.dateUtil.getWeekByDay(this.format_week(i._id.toString())));
        this.workTimeList.push((i.totalHours / 1000 / 3600).toFixed(2));
      }
      this.onTheJob = this.briefReport.getOnTheJob(this.workTimeList, dataAxis, weekAxis);
    });
  }*/

  getYestodayWorkTime() {
    this.trendService.getYestodayWorkTime(this.orgCode, this.yesterDay, this.yesterDay).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.yesWorkTime = data.totalHours ? (data.totalHours / 60).toFixed(2) : 0;
      this.staffNum = data.staffNum;
    });
  }

  getOnDuty() {
    this.trendService.getOnDuty(this.orgCode).subscribe(data => {
      // console.log(JSON.stringify(data, null, 4));
      this.isOnDuty = data.isOnduty;
      this.ondutyStaffNum = data.ondutyStaffNum ? data.ondutyStaffNum : 0;
    });
  }


  formatDay(date) {
    const dateArr = date.split('-');
    return dateArr[1] + '月' + dateArr[2] + '日';
  }

  formatWeek(num) {
    switch (num) {
      case '1':
        return '星期一';
      case '2':
        return '星期二';
      case '3':
        return '星期三';
      case '4':
        return '星期四';
      case '5':
        return '星期五';
      case '6':
        return '星期六';
      case '7':
        return '星期日';
      default:
        return num;
    }
  }

  formatDate(date) {
    const format_date = date.substring(4, 6) + '.' + date.substring(6);
    return format_date;
  }

  format_week(date) {
    const format_date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6);
    return format_date;
  }
}


