import {Injectable} from "@angular/core";
import {WebHttpClient} from "../web.httpclient";

@Injectable()
export class RegionalPerformanceService {

  constructor(private http: WebHttpClient) {}

  saleOrgPerformance(levelId: any, orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/regional/sales', {levelId: levelId, orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  saleZonePerformance(zoneLevelId: any, orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/regional/sales/zone', {zoneLevelId: zoneLevelId, orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

}
