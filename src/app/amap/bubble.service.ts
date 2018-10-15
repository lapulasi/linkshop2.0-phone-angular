import {Injectable} from "@angular/core";
import {WebHttpClient} from "../web.httpclient";
import {map} from "rxjs/operators";
@Injectable()
export class BubbleService {

  constructor(private http: WebHttpClient) {}

  getBubbleData(selectedLevel: any, orgCode: any, gadcode: any, startDate: any, endDate: any) {
    if (selectedLevel.shop) {
      return this.shopData(orgCode, '0', startDate, endDate);
    } else if (selectedLevel.id > 0) {
      return this.manageData(selectedLevel.id, orgCode, startDate, endDate);
    } else {
      return this.zoneData(selectedLevel.id, orgCode, gadcode, startDate, endDate);
    }

  }

  private manageData(levelId: any, orgCode: any, startDate: any, endDate: any) {
    return this.http.get('/org/datas', {levelId: levelId, orgCode: orgCode, startDate: startDate, endDate: endDate});
  }

  private shopData(orgCode: any, adcode: any, startDate: any, endDate: any) {

    return this.http.get('/org/shop/datas', {orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  private zoneData(zoneLevelId: any, orgCode: any, gadcode: any, startDate: any, endDate: any) {

    return this.http.get('/org/zone/datas', {zoneLevelId: zoneLevelId, orgCode: orgCode, adcode: gadcode, startDate: startDate, endDate: endDate});
  }



}
