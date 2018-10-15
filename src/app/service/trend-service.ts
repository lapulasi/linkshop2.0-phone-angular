import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()

export class TrendService {
  constructor(private http: WebHttpClient) {
  }

  dayStat(orgCode: any, startDate: any, endDate: any) {
    return this.http.get('/org/dayStat/' + orgCode, {
      startDate: startDate, endDate: endDate
    });
  }

  weekStat(orgCode: any, startDate: any, endDate: any) {
    return this.http.get('/org/weekStat/' + orgCode, {
      startDate: startDate, endDate: endDate
    });
  }

  monthStat(orgCode: any, startDate: any, endDate: any) {
    return this.http.get('/org/monthStat/' + orgCode, {
      startDate: startDate, endDate: endDate
    });
  }

  shops(orgCode: any) {
    return this.http.get('/org/shop/count', {
      orgCode: orgCode
    });
  }

  getWorkList(orgCode: any, startDate: any, endDate: any) {
    return this.http.get('/org/staff/day/' + orgCode, {
      startDate: startDate, endDate: endDate
    });
  }

  getYestodayWorkTime(orgCode: any, startDate: any, endDate: any) {
    return this.http.get('/org/staff/worktime/' + orgCode, {
      startDate: startDate, endDate: endDate
    });
  }

  getOnDuty(orgCode: any) {
    return this.http.get('/org/staff/today/' + orgCode, null);
  }

  todayWeather(orgCode: any, date: any) {
    return this.http.get('/org/weather/list/' + orgCode, {date: date});
  }

  recentWeather(adCode: any) {
    const key = '87533684b7544d151e6b245cf33dd8b7';
    return this.http.get('https://restapi.amap.com/v3/weather/weatherInfo?key=' + key + '&extensions=all&city=' + adCode);
  }

  singleWeather(orgCode: any, date: any) {
    return this.http.get('/org/weather/' + orgCode, {date: date});
  }
}
