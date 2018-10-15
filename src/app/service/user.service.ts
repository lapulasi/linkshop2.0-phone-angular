import {Injectable} from '@angular/core';
import {WebHttpClient} from '../web.httpclient';

@Injectable()

export class UserService {
  constructor(private http: WebHttpClient) {
  }

  userInfo(userId: any) {
    return this.http.get('/org/user/' + userId);
  }
}
