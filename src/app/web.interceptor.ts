import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class WebInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url: string = req.url;
    if (url.indexOf('http://') < 0) {
      req = req.clone({
        url: environment.service_url + req.url,
        setHeaders: this.setAuthorization(),
        setParams: this.setToken()
      });
    }
    return next.handle(req).catch(err => this.handleError(err));
  }

  // handle 401
  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      window.location.href = 'login://out';

      return Observable.of(err.message);
    }
    return Observable.throw(err);
  }

  setAuthorization() {
    if (localStorage.getItem('access_token')) {
      return {Authorization: 'bearer ' + localStorage.getItem('access_token')};
    }
    return {};
  }

  setToken() {
    if (localStorage.getItem('access_token')) {
      return {access_token: localStorage.getItem('access_token')};
    }
    return {};
  }

}
