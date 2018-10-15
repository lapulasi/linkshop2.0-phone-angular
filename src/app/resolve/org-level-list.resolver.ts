import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {OrgLevelService} from '../service/org-level.service';

@Injectable()
export class OrgLevelListResolver implements Resolve<any> {

  constructor(private orgLevel: OrgLevelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {

    const orgCode = route.params.orgCode;

    return this.orgLevel.listOrgLevelByCode(orgCode);
  }
}
