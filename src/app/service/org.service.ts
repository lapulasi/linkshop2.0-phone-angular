import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class OrgService {

  constructor(private http: WebHttpClient) {}

  getOrg(orgId: any) {
    return this.http.get('/org/' + orgId, null);
  }

  getOrgByCode(orgCode: any) {
    return this.http.get('/org/bycode/' + orgCode, null);
  }

  listOrgs(levelId: any, orgCode: any) {
    return this.http.get('/org/list', {levelId: levelId, orgCode: orgCode});
  }

  async listOrgsAsync(levelId: any, orgCode: any): Promise<any> {
    const res = await this.listOrgs(levelId, orgCode).toPromise();
    return res;
  }

  listOrgsQuery(query: any, levelId: any, orgCode: any) {
    return this.http.get('/org/list/query', {query: query, levelId: levelId, orgCode: orgCode});
  }

}
