import {ChangeDetectorRef, Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {WebBridge} from "../common/web-bridge";

@Injectable()
export class RegionService {

  overviewShow = false;
  searchShow = false;

  constructor(private http: WebHttpClient, private router: Router, private route: ActivatedRoute) {}

  // list
  regionGuest(levelId: any, orgCode: any, adcode: any, gender: any, ageRange: any, startDate: any, endDate: any) {
    return this.http.get('/org/access/stat', {levelId: levelId, orgCode: orgCode, adcode: adcode,
      gender: gender, ageRange: ageRange, startDate: startDate, endDate: endDate});
  }

  // list
  regionSales(levelId: any, orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/regional/sales', {levelId: levelId, orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  // list
  regionShop(levelId: any, orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/regional/shop', {levelId: levelId, orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  // overview
  regionShopInfo(orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/guest', {orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  // overview
  regionGuestnfo(gender: any, ageRange: any, orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/access', {gender: gender, ageRange: ageRange, orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  // 搜索组织
  search(query: any, levelId: any, orgCode: any) {
    return this.http.get('/org/list/query', {query: query, levelId: levelId, orgCode: orgCode});
  }

  // 初始化页面状态
  initPageStatus() {
    this.route.queryParams.subscribe(queryParams => {
      this.overviewShow = false;
      this.searchShow = false;
      const paramsKeys: String[] = Object.keys(queryParams);
      if (queryParams && paramsKeys.length > 0) {
        if (paramsKeys.indexOf('showOverview') >= 0) {
          this.overviewShow = true;
        } else if (paramsKeys.indexOf('showSearch') >= 0) {
          this.searchShow = true;
        }
      }
    });
  }

  webBridgeEvent(webBridge: WebBridge, ref: ChangeDetectorRef, path) {
    const that = this;

    webBridge.callWebBridge('showOveriewIcon', {'data': 'showOveriewIcon'}, function(data) {
      console.log('show icon');
    });

    webBridge.registerHandler('showOveriewPage', function(data, responseCallback) {
      that.showOverview(path);
      ref.detectChanges();
      if (responseCallback) {
        responseCallback({'data': 'showOveriewPage'});
      }

    });

    // this.router.events
    //   .subscribe((event) => {
    //     if (event instanceof NavigationEnd) { // 导航结束
    //       if (!event.url.startsWith(path)) {
    //         console.log('hideIcon', event.url, path);
    //         webBridge.callWebBridge('hideOveriewIcon', {'data': 'guest-hideOveriewIcon'}, function(data) {
    //           console.log('hide icon');
    //         });
    //       }
    //     }
    //   });
  }

  showOverview(path) {
    this.overviewShow = true;
    this.router.navigate([path], {queryParams: {showOverview: 1}, queryParamsHandling: 'merge'});
  }

  // 显示搜索页面
  gotoSearch(path) {
    // this.showOverview();
    this.searchShow = true;
    this.router.navigate([path], {queryParams: {showSearch: 1}, queryParamsHandling: 'merge'});
  }

  // 从搜索页面返回
  hideSearch(event, path) {
    this.searchShow = event.show;
    this.router.navigate([path]);
    if (event.selectId) {

      const element = document.getElementById('target' + event.selectId);
      if (element) {
        element.scrollIntoView();
        element.style.backgroundColor = '#EAEDF2';
      }
    }
  }



}
