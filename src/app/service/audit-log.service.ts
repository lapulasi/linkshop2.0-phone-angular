import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';
import {log} from "util";

@Injectable()
export class AuditLogService {

  viewIndex = 'VIEW_INDEX';
  viewBrief = 'VIEW_BRIEF';
  viewDetail = 'VIEW_DETAIL';
  viewRankingList = 'VIEW_RANKING_LIST';
  viewCompetition = 'VIEW_COMPETITION';
  viewPerformGuest = 'VIEW_PERFORM_GUEST';
  viewPerformSales = 'VIEW_PERFORM_SALES';
  viewPerformShop = 'VIEW_PERFORM_SHOP';
  viewTrendGuest = 'VIEW_TREND_GUEST';
  viewTrendSales = 'VIEW_TREND_SALES';
  viewTrendShop = 'VIEW_TREND_SHOP';
  viewSuggestGuest = 'VIEW_SUGGEST_GUEST';
  viewSuggestSales = 'VIEW_SUGGEST_SALES';
  viewSuggestShop = 'VIEW_SUGGEST_SHOP';
  viewHeatMap = 'VIEW_HEAT_MAP';

  constructor(private http: WebHttpClient) {}

  // emitAuditEvent(type: any, content: any) {
  //   console.log(`call audit: ${type}-----${content}`);
  //  this.http.post('/user/audit', {type: type, content: content}).subscribe();
  // }

  addPageLog(url: any) {
    log(`page:${this.getPageName(url)}---------${url}`);
    if (localStorage.getItem('access_token')) {
      this.http.post('/user/audit/page', {pageName: this.getPageName(url), url: url}).subscribe();
    }
  }

  addEventLog(eventName: any, content: any) {
    log(`event: ${eventName}-----${content}`);
    if (localStorage.getItem('access_token')) {
      this.http.post('/user/audit/event', {eventName: eventName, content: content}).subscribe();
    }
  }

  private getPageName(url: String) {
    if (url.search(/\/index/) !== -1) {
      return '首页';
    } else if (url.search(/\/brief/) !== -1) {
      return '简报';
    } else if (url.search(/\/heatMap\/date/) !== -1) {
      return '热力图-时段对比';
    } else if (url.search(/\/heatMap\/shopList/) !== -1) {
      return '热力图-门店对比';
    } else if (url.search(/\/heatMap/) !== -1) {
      return '热力图';
    } else if (url.search(/\/advice/) !== -1) {
      return '详情';
    } else if (url.search(/\/sales\/rank/) !== -1) {
      return '排行榜';
    } else if (url.search(/\/resale\/advice/) !== -1) {
      return '零售参谋';
    } else if (url.search(/\/regional\/performance\/guest/) !== -1 || url.search(/\/region\/guest/) !== -1) {
      return '客流表现';
    } else if (url.search(/\/regional\/performance\/sales/) !== -1 || url.search(/\/region\/sales/) !== -1) {
      return '销售表现';
    } else if (url.search(/\/regional\/performance\/effective/) !== -1 || url.search(/\/region\/shop/) !== -1) {
      return '门店表现';
    } else if (url.search(/\/trend\/customerTrend/) !== -1) {
      return '客流趋势';
    } else if (url.search(/\/trend\/salesTrend/) !== -1) {
      return '销售趋势';
    } else if (url.search(/\/trend\/shopTrend/) !== -1) {
      return '门店趋势';
    } else if (url.search(/\/suggest\/customer/) !== -1) {
      return '客流参谋';
    } else if (url.search(/\/suggest\/sales/) !== -1) {
      return '销售参谋';
    } else if (url.search(/\/suggest\/store/) !== -1) {
      return '门店参谋';
    }
  }

}
