import {Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {DateUtil} from '../../common/date-util';
import {ShopGuestService} from '../../service/shop-guest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {WeatherService} from "../../service/weather.service";
import {DatePipe} from "@angular/common";


@Component({
  templateUrl: './index-advice.html'
})

export class IndexAdviceComponent implements OnInit {


  org: any;
  orgCode: any;
  adcode: any;

  todayData: any;
  yesterdayData: any;
  manageRole: any;  // 1:管理，0:单店
  weatherInfo: any;

  // adcodePara: any = '';
  constructor(private dateUtil: DateUtil,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private datePipe: DatePipe,
              private weatherService: WeatherService,
              private shopGuestService: ShopGuestService) {
  }

  ngOnInit() {
    this.org = this.route.snapshot.data.org;
    this.orgCode = this.route.snapshot.params.orgCode;
    this.adcode = this.route.snapshot.params.adcode;
    this.manageRole = this.route.snapshot.queryParams.manageRole;
    // console.log(this.route.snapshot.queryParams.manageRole);

    const today = this.dateUtil.formatDate(Date.now());
    const yesterday = this.dateUtil.getRangeDate(-1);

    this.shopGuestService.getOrgGuest(this.orgCode, this.adcode, today, today).subscribe(result => {
      this.todayData = result;
    });

    this.shopGuestService.getOrgGuest(this.orgCode, this.adcode, yesterday, yesterday).subscribe(result => {
      this.yesterdayData = result;
    });

    this.title.setTitle('详情');

    if (this.manageRole === '0') {
      this.loadWeather(this.org.adcode);
    }

  }

  // 天气信息
  loadWeather(adcode: any) {
    if (adcode.substring(2, 6) !== '0000') {

      const today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
      this.weatherService.getDistrictWeather(adcode, today).subscribe(data => {
          // console.log(data);
          if (data) {
            this.weatherInfo = {
              weather: this.weatherService.getWeatherDescribe(data.weather),
              temperature: data.temperature
            };
          } else {
            this.weatherInfo = {weather: {icon: 'cloudy', name: '多云'}, temperature: 25};
          }
        },
        error => this.weatherInfo = {weather: {icon: 'cloudy', name: '多云'}, temperature: 25}
      );
    }

  }

  gotoSalesRank() {
      this.router.navigate(['/sales/rank/' + this.orgCode + '/' + this.adcode]);
  }

  gotoCompetitive() {
      this.router.navigate(['/resale/advice/' + this.orgCode + '/' + this.adcode]);
  }

  gotoRegional(vdoing) {
    // if (!environment.dev) {
    //   this.router.navigate(['/regional/performance/' + vdoing + '/' + this.orgCode + '/' + this.adcode]);
    // } else {
      if (vdoing === 'guest') {
        this.router.navigate(['/region/guest', this.orgCode, this.adcode]);
      } else if (vdoing === 'sales') {
        this.router.navigate(['/region/sales', this.orgCode, this.adcode]);
      } else if (vdoing === 'effective') {
        this.router.navigate(['/region/shop', this.orgCode, this.adcode]);
      }
    // }

  }

  gotoTrend(style) {
    if (style === 'customer') {
      this.router.navigate(['/trend/customerTrend/' + this.orgCode]);
    } else if (style === 'sales') {
      this.router.navigate(['/trend/salesTrend/' + this.orgCode]);
    } else if (style === 'shop') {
      this.router.navigate(['/trend/shopTrend/' + this.orgCode]);
    }
  }


  gotoSalesSuggest() {
    this.router.navigateByUrl('suggest/customer/' + this.orgCode);
  }

  gotoShopSuggest() {
    this.router.navigateByUrl('suggest/sales/' + this.orgCode);
  }

  gotoCustomerSuggest() {
    this.router.navigateByUrl('suggest/store/' + this.orgCode);
  }

  backMap() {
    console.log(sessionStorage.getItem('indexUrl'));
    if (window.sessionStorage && sessionStorage.getItem('indexUrl')) {

      this.router.navigateByUrl(sessionStorage.getItem('indexUrl'));
    }

  }

}
