import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class ShopSalesService {

  constructor(private http: WebHttpClient) {}

  // getShopSales(orgCode: any, adcode: any, startDate: any, endDate: any) {
  //   return this.http.get('/org/sales', {orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  // }
  //
  // async getShopSalesAsync(orgCode: any, adcode: any, startDate: any, endDate: any): Promise<any> {
  //   const res = await this.getShopSales(orgCode, adcode, startDate, endDate).toPromise();
  //   return res;
  // }

  // listShopSales(orgCode: any, adcode: any, startDate: any, endDate: any) {
  //   return this.http.get('/org/sales/list', {orgCode: orgCode, adcode: adcode, startDate: startDate, endDate: endDate});
  // }

}
