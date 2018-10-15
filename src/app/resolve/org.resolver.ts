import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {OrgService} from '../service/org.service';

@Injectable()
export class OrgResolver implements Resolve<any> {

  constructor(private org: OrgService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {

    const orgCode = route.params.orgCode;

    return this.org.getOrgByCode(orgCode);
  }
}
