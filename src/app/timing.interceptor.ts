import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {tap} from "rxjs/operators";
import {log} from "util";
import {environment} from "../environments/environment";

export class TimingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();

    return next
      .handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            if (!environment.production) {
              log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
            }
          }
        }));
  }

}
