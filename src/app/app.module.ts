import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WebInterceptor} from './web.interceptor';
import {WebHttpClient} from './web.httpclient';

import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import './common/array-extend';
import {AuditLogService} from './service/audit-log.service';
import {TimingInterceptor} from './timing.interceptor';
import {InfiniteCalendarModule} from './infinite-calendar/infinite-calendar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    HttpClientModule,
    InfiniteCalendarModule,
    NgbModule.forRoot()
  ],
  providers: [
    WebHttpClient,
    AuditLogService,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: WebInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
