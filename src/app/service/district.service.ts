import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class DistrictService {

  constructor(private http: WebHttpClient) {}

  getDistrictName(adcode: any) {
    return this.http.get('/org/district/' + adcode);
  }

  async getDistrictNameAsync(adcode: any): Promise<any> {
    return await this.http.get('/org/district/' + adcode).toPromise();
  }

}
