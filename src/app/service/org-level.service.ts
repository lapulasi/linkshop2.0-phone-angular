import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class OrgLevelService {

  constructor(private http: WebHttpClient) {}

  listOrgLevel(orgId: any) {
    return this.http.get('/org/level', {orgId: orgId});
  }
  listOrgLevelByCode(orgCode: any) {
    return this.http.get('/org/code/level', {orgCode: orgCode});
  }

  getOrgLevel(levelId: any) {
    return this.http.get('/org/level/' + levelId, null);
  }

  async getOrgLevelAsync(levelId: any): Promise<any>  {
    return await this.getOrgLevel(levelId).toPromise();
  }

  getOrginalOrgLevel(orgId: any) {
    return this.http.get('/org/level/curr/' + orgId, null);
  }

  getNextOrgLevel(levelId: any) {
    return this.http.get('/org/level/next/' + levelId, null);
  }

  async getNextOrgLevelAsync(levelId: any): Promise<any> {

    return await this.getNextOrgLevel(levelId).toPromise();
  }

  getShopLevelByOrgCode(orgCode: any) {
    return this.http.get(`/org/level/shop/${orgCode}`, null);
  }



}
