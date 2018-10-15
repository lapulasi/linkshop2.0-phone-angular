import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenResolver implements Resolve<any> {

  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    if (route.queryParams.access_token) {
      const accessToken = route.queryParams.access_token;
      const existToken = localStorage.getItem('access_token');
      if (!existToken) {
        localStorage.setItem('access_token', accessToken);
      } else if (existToken && accessToken !== existToken) {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', accessToken);
      }
    }

    return null;
  }
}
