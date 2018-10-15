import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()
export class DateService {

  constructor(private http: WebHttpClient) {}

  switchDate(type: any, date: any, amount: any) {
    return this.http.get('/org/switch/date', {type: type, date: date, amount: amount});
  }

  async switchDateAsync(type: any, date: any, amount: any): Promise<any> {
    return await this.switchDate(type, date, amount).toPromise();
  }

}
