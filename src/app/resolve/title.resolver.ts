import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {OrgService} from '../service/org.service';
import {DistrictService} from "../service/district.service";

@Injectable()
export class TitleResolver implements Resolve<any> {

  constructor(private org: OrgService, private districeService: DistrictService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {

    const orgCode = route.params.orgCode;

    const gadcode = route.params.gadcode;
    if (gadcode === '0') {
      return this.org.getOrgByCode(orgCode);
    }

    return this.districeService.getDistrictName(gadcode);
  }
}
