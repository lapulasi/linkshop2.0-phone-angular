import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';
import {concat, map, merge, skip} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {forkJoin} from "rxjs/observable/forkJoin";

@Injectable()
export class LevelListService {

  private province = {id: -2, name: '省份', shop: false, minZoom: 5, maxZoom: 7, len: 4};
  private city = {id: -4, name: '城市', shop: false, minZoom: 7, maxZoom: 9, len: 3};
  private area = {id: -6, name: '区域', shop: false, minZoom: 12, maxZoom: 14, len: 2};

  constructor(private http: WebHttpClient) {}

  getShopLevel(orgCode: any) {
    return this.http.get('/org/level/shop/' + orgCode, null);
  }

  getLevels(orgCode: any, gadcode: any, adcode: any, type: any): Observable<any> {
    if (gadcode === '0') {
      if (type === 'zone') {
        return this.getZoneLeves(orgCode, adcode);
      }
      return this.http.get('/org/code/level', {orgCode: orgCode}).pipe(
        map(data => {
          if (data.length > 1) {
            data.shift();
          }
          return data;
        })
      );
    }

    return this.getZoneLevesBygadcode(orgCode, gadcode);

  }

  getZoneLeves(orgCode: any, code: any) {
    const shopLevel = this.getShopLevel(orgCode);

    if (code % 10000 === 0) {
      return forkJoin(of(this.province), of(this.city), of(this.area), shopLevel);
    } else if (code % 100 === 0) {
      return forkJoin(of(this.area), shopLevel);
    } else {
      return forkJoin(shopLevel);
    }
  }

  getZoneLevesBygadcode(orgCode: any, code: any) {
    const shopLevel = this.getShopLevel(orgCode);

    if (code % 10000 === 0) {
      return forkJoin(of(this.city), of(this.area), shopLevel);
    } else if (code % 100 === 0) {
      return forkJoin(of(this.area), shopLevel);
    } else {
      return forkJoin(shopLevel);
    }
  }


}
