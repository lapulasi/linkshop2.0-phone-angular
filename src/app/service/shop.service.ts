import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ShopService {

  constructor(private http: WebHttpClient,
              private httpClient: HttpClient) {
  }

  listShops(orgCode: any, adcode: any) {
    return this.http.get('/org/shops', {orgCode: orgCode, adcode: adcode});
  }

  async listShopsAsync(orgCode: any, adcode: any): Promise<any> {
    const res = await this.listShops(orgCode, adcode).toPromise();
    return res;
  }

  listZones(zoneLevelId: any, orgCode: any, adcode: any) {
    return this.http.get('/org/list/zone', {zoneLevelId: zoneLevelId, orgCode: orgCode, adcode: adcode});
  }

  async listZonesAsync(zoneLevelId: any, orgCode: any, adcode: any): Promise<any> {
    const res = await this.listZones(zoneLevelId, orgCode, adcode).toPromise();
    return res;
  }

  listZonesQuery(query: any, zoneLevelId: any, orgCode: any, adcode: any) {
    return this.http.get('/org/list/zone/query', {
      query: query,
      zoneLevelId: zoneLevelId,
      orgCode: orgCode,
      adcode: adcode
    });
  }

  listGrade(orgCode: any) {
    return this.http.get('/org/list/grade', {orgCode: orgCode});
  }

  getBrokenShopCount(orgCode: any) {
    return this.http.get('/org/shop/broken/count', {orgCode: orgCode});
  }

  salesReport(params) {
    return this.httpClient.post('/org/shop/sales', params, {observe: 'response'});
  }

  getShopName(id: any) {
    return this.http.get('/org/' + id);
  }

}
