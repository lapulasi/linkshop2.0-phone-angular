import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class DataStatService {

  constructor(private http: WebHttpClient) {}

  getAccessStat(gender: any, ageRange: any, orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/access', {gender: gender, ageRange: ageRange, orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  async getAccessStatAsync(gender: any, ageRange: any, orgCode: any, adcode: any, startDate: any, endDate: any): Promise<any> {
    const res = await this.getAccessStat(gender, ageRange, orgCode, adcode, startDate, endDate).toPromise();
    return res;
  }

  listOrgAccessStat(levelId: any, orgCode: any, adcode: any, gender: any, ageRange: any, startDate: any, endDate: any) {
    return this.http.get('/org/access/stat', {levelId: levelId, orgCode: orgCode, adcode: adcode,
      gender: gender, ageRange: ageRange, startDate: startDate, endDate: endDate});
  }

  listZoneAccessStat(zoneLevelId: any, orgCode: any, adcode: any, gender: any, ageRange: any, startDate: any, endDate: any) {
    return this.http.get('/org/access/stat', {zoneLevelId: zoneLevelId, orgCode: orgCode, adcode: adcode,
      gender: gender, ageRange: ageRange, startDate: startDate, endDate: endDate});
  }


  // index
  listOrgDatas(levelId: any, orgCode: any, startDate: any, endDate: any) {

    return this.http.get('/org/datas', {levelId: levelId, orgCode: orgCode, startDate: startDate, endDate: endDate});
  }

  listShopDatas(orgCode: any, adcode: any, startDate: any, endDate: any) {

    return this.http.get('/org/shop/datas', {orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  listZoneDatas(zoneLevelId: any, orgCode: any, adcode: any, startDate: any, endDate: any) {

    return this.http.get('/org/zone/datas', {zoneLevelId: zoneLevelId, orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

}
