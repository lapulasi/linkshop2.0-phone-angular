import {Injectable} from "@angular/core";
import {WebHttpClient} from "../web.httpclient";

@Injectable()
export class DeviceService {

  constructor(private http: WebHttpClient) {}

  getDeviceType(shopId: any) {
    return this.http.get('/device/type', {shopId: shopId});
  }

}
