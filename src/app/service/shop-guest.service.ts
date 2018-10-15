import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class ShopGuestService {

  constructor(private http: WebHttpClient) {}

  getOrgGuest(orgCode: any, adcode: any, startDate: any, endDate: any) {
    return this.http.get('/org/guest', {orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  }

  async getOrgGuestAsync(orgCode: any, adcode: any, startDate: any, endDate: any): Promise<any> {
    const res = await this.getOrgGuest(orgCode, adcode, startDate, endDate).toPromise();
    return res;
  }


}
