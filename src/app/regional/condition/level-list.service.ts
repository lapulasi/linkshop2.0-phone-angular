import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {forkJoin} from "rxjs/observable/forkJoin";
import {WebHttpClient} from "../../web.httpclient";

@Injectable()
export class LevelListService {

  constructor(private http: WebHttpClient) {}

  getShopLevel(orgCode: any) {
    return this.http.get('/org/level/shop/' + orgCode, null);
  }

  getLevels(orgCode: any, gadcode: any): Observable<any> {
    if (gadcode === '0') {
      return this.http.get('/org/code/level', {orgCode: orgCode}).pipe(
        map(data => {
          if (data.length > 1) {
            data.shift();
          }
          return data.reverse();
        })
      );
    }

    return this.getZoneLeves(orgCode, gadcode);
  }

  getZoneLeves(orgCode: any, code: any) {
    const province = {id: -2, name: '省份', shop: false};
    const city = {id: -4, name: '城市', shop: false};
    const area = {id: -6, name: '区域', shop: false};
    const shopLevel = this.getShopLevel(orgCode);

    if (code % 10000 === 0) {
      return forkJoin(of(province), of(city), of(area), shopLevel);
    } else if (code % 100 === 0) {
      return forkJoin(of(area), shopLevel);
    } else {
      return forkJoin(shopLevel);
    }
  }

  getZoneLevesBygadcode(orgCode: any, code: any) {
    // const province = {id: -2, name: '省份', shop: false, minZoom: 5, maxZoom: 7, len: 4};
    const city = {id: -4, name: '城市', shop: false};
    const area = {id: -6, name: '区域', shop: false};
    const shopLevel = this.getShopLevel(orgCode);

    if (code % 10000 === 0) {
      return forkJoin(of(city), of(area), shopLevel);
    } else if (code % 100 === 0) {
      return forkJoin(of(area), shopLevel);
    } else {
      return forkJoin(shopLevel);
    }
  }


}
